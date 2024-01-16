<?php

namespace App\Http\Controllers\Api\v1_0\Auth;

use App\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'remember_token' => ['required'],
            'email' => ['prohibited_unless:phone,null,', 'required_without:phone', 'email', 'max:128'],
            'phone' => ['prohibited_unless:email,null', 'required_without:email', 'phone', 'max:30'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        Log::debug('Password for ' . ($request->email ?? $request->phone) . ' renewed');

        $user = User::where( $validated['email'] ?? ''
                ? $request->only('email', 'remember_token')
                : $request->only('phone', 'remember_token')
        )->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'status' => Password::INVALID_TOKEN,
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($validated['password'] ?? ''),
            'remember_token' => '',
        ])->save();

        event(new PasswordReset($user));

        return response()->json([
            'status' => Api::STATUS_SUCCESS,
            'message' => Password::PASSWORD_RESET
        ]);
    }
}
