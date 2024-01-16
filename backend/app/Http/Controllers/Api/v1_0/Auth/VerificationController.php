<?php

namespace App\Http\Controllers\Api\v1_0\Auth;

use App\Api;
use App\Notifications;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerificationRequest;
use App\Http\Services\NotificationService;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class VerificationController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param \Illuminate\Http\Request $request
     * @param string                   $pin
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
     * @throws \App\Exceptions\ApiException
     * @throws \Illuminate\Validation\ValidationException
     */
    public function check(Request $request, string $pin): Application|ResponseFactory|\Illuminate\Foundation\Application|Response
    {
        // Get the user from the request
        $user = $this->getCustomer($request);

        // Check if the pin provided matches the user's profile pin
        if ($user->profile?->verify_pin !== $pin) {
            // Log the failed pin check
            Log::debug('Pin check fail: ' . $pin);

            // Throw an ApiException if the pin check fails
            throw new ApiException([
                'status' => Api::STATUS_FAIL,
                'user' => $user,
            ], 'Pin check failed', 417);
        }

        // Check if the user has not verified their email address
        if (!$user->hasVerifiedEmail() && $user->markEmailAsVerified()) {
            // Fire the Verified event
            event(new Verified($user));
        }

        // Generate a token based on the status and the user's profile pin
        $token = sha1(Api::SECRET . $user->profile->verify_pin);

        // Set the user's remember token to the generated token
        $user->remember_token = $token;
        $user->save();

        // Log the successful pin check
        Log::debug('Pin '. $pin .' check success: ' . $token);

        // Return a response with the status and remember token
        return response([
            'status' => Api::STATUS_VERIFIED,
            'remember_token' => $token,
        ]);
    }

    /**
     * Generate a pin for the user and send it to them.
     *
     * @param \App\Http\Requests\Auth\VerificationRequest $request
     * @return \Illuminate\Http\Response
     * @throws \App\Exceptions\ApiDependencyException
     * @throws \App\Exceptions\ApiException
     * @throws \Illuminate\Validation\ValidationException
     */
    public function pin(VerificationRequest $request): Response
    {
        // Get the user from the request
        $user = $this->getCustomer($request);

        Log::info('Generate new pin');
        // Generate a random pin for the user
        $user->profile = array_merge(
            (array)$user->profile,
            ['verify_pin' => Str::password(6, false, true, false)]
        );
        // Save the user
        $user->save();

        // Send the pin to the user
        NotificationService::facade()->tagsForUser($user, ['pin' => $user->profile->verify_pin ?? '']);
        $result = NotificationService::facade()->notifyExternalUser($user, Notifications::NOTIFICATION_PIN);

        // Log the pin sent
        Log::debug('Customer pin ' . ($user->profile->verify_pin ?? '') . ' send to ' . ($user->email ?? $user->phone) );

        // Return a response with the status and pin
        return response([
            'status' => Api::STATUS_SUCCESS,
            'pin' => $user->profile->verify_pin ?? '',
            'notify' => $result
        ]);
    }

    /**
     * Get the user from the request.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     * @throws \Illuminate\Validation\ValidationException
     * @throws \App\Exceptions\ApiException
     */
    protected function getCustomer(Request $request): mixed
    {
        // Get the user from the request
        $user = $request->user();

        // If the user exists, return it
        if ($user) {
            Log::info('Pin for authenticated user');
            return $user;
        }

        // Validate the request for either an email or a phone
        $request->validate([
            'email' => ['prohibited_unless:phone,null,', 'required_without:phone', 'email', 'max:128'],
            'phone' => ['prohibited_unless:email,null', 'required_without:email', 'phone', 'max:30'],
        ]);

        // Get the user from the database based on the email or phone
        $user = User::where($request->email ?? false
            ? $request->only('email')
            : $request->only('phone'))->first();

        // If the user exists, return it
        if ($user) {
            Log::info('Pin for user by credentials');
            return $user;
        }

        Log::warning('Pin credentials invalid');
        // Throw a ValidationException if the user does not exist
        throw new ApiException([
            'status' => Api::STATUS_FAIL,
            'message' => Password::INVALID_USER,
        ]);
    }

}
