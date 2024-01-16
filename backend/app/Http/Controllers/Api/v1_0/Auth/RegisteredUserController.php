<?php

namespace App\Http\Controllers\Api\v1_0\Auth;

use App\Api;
use App\Notifications;
use App\Http\Controllers\Controller;
use App\Http\Services\NotificationService;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        Log::info('Customer ' . ($request->email ?? $request->phone) . ' wants to be registered');

        $request->validate([
            'name' => ['string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'email' => ['prohibited_unless:phone,null,', 'required_without:phone', 'email', 'max:128', 'unique:users'],
            'phone' => ['prohibited_unless:email,null', 'required_without:email', 'phone', 'max:30', 'unique:users'],
        ]);

        Log::debug('Customer ' . ($request->email ?? $request->phone) . ' credentials validated');

        $user = User::create([
            'name' => request('name', uuid_create(UUID_TYPE_TIME) ),
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        Log::debug('Customer ' . ($request->email ?? $request->phone) . ' created');

        $user->profile = [
            'identifier' => sha1($user->name),
            'verify_pin' => Str::password(6, false, true, false, false),
            'geolocation' => $request->geolocation()->toArray(),
        ];
        $user->save();

        Log::debug('Customer ' . ($request->email ?? $request->phone) . ' profile with geolocation created');

        event(new Registered($user));

        Auth::login($user);

        $notify_device = NotificationService::facade()->addDevice($user);
        NotificationService::facade()->tagsForUser($request->user(), ['pin' => $user->profile->verify_pin]);
        NotificationService::facade()->notifyExternalUser($user,Notifications::NOTIFICATION_PIN );

        Log::debug('Registered customer pin ' . $user->profile->verify_pin . ' send to ' . ($user->email ?? $user->phone) );

        return response([
            'status' => Api::STATUS_SUCCESS,
            'user' => $user,
            'notify_device' => $notify_device,
            'pin' => $user->profile->verify_pin,
        ]);
    }
}