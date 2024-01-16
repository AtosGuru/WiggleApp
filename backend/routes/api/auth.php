<?php

use App\Http\Controllers\Api\v1_0\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\v1_0\Auth\NewPasswordController;
use App\Http\Controllers\Api\v1_0\Auth\RegisteredUserController;
use App\Http\Controllers\Api\v1_0\Auth\VerificationController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware('guest')
                ->name('register');

Route::get('/verify', [VerificationController::class, 'pin'])
                ->middleware('throttle:1,1')
                ->name('verification.pin');

Route::get('/verify/{pin}', [VerificationController::class,'check'])
                ->middleware('throttle:3,1')
                ->name('verification.verify');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest')
                ->name('login');

Route::post('/password/reset', [NewPasswordController::class, 'store'])
                ->middleware('throttle:3,1')
                ->name('password.store');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth:sanctum')
                ->name('logout');

// Social network auth
Route::get('/open/{provider}/callback', [\App\Http\Controllers\Api\v1_0\Auth\SocialiteController::class, 'callback'])
                ->middleware('guest')
                ->name('social.callback');

Route::get('/open/{provider}/redirect', [\App\Http\Controllers\Api\v1_0\Auth\SocialiteController::class, 'redirect'])
                ->middleware('guest')
                ->name('social.redirect');

Route::get('/open/{provider}/{token}', [\App\Http\Controllers\Api\v1_0\Auth\SocialiteController::class, 'byToken'])
                ->middleware('auth')
                ->name('social.check');

