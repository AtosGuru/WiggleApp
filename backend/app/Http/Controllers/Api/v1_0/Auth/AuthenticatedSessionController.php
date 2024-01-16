<?php

namespace App\Http\Controllers\Api\v1_0\Auth;

use App\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(LoginRequest $request): Response
    {
        Log::info('Customer authenticate');

        $request->authenticate();

        return response([
            'status' => Api::STATUS_SUCCESS,
            'message' => Api::STATUS_SIGNED,
            'user' => $request->user(),
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Log::debug('Customer unsigned');

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response([
            'status' => Api::STATUS_SUCCESS,
            'message' => Api::STATUS_UNSIGNED,
        ]);
    }
}
