<?php

namespace App\Http\Controllers\Api\v1_0\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(string $provider)
    {
        return Socialite::driver($provider)
            ->with(['hd' => env('APP_URL')])
            ->redirect();
    }

    public function callback(string $provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();
        $socialUser['provider'] = $provider;

        $user = User::updateOrCreate([
            'social_id' => $socialUser->getId(),
        ], [
            'name' => $socialUser->getName(),
            'email' => $socialUser->getEmail(),
            'profile' => $socialUser,
            'remember_token' => $socialUser->token,
        ]);

        Auth::login($user);

        return $user;
    }

    public function byToken(string $provider, $token)
    {
        $user = Socialite::driver('github')->userFromToken($token);
    }
}
