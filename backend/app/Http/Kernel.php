<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class,
        \App\Http\Middleware\TrustProxies::class, // Trusts proxies for requests
        \Illuminate\Http\Middleware\HandleCors::class, // Handles Cross-Origin Resource Sharing (CORS)
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class, // Prevents requests during maintenance
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class, // Validates the size of the POST request
        \App\Http\Middleware\TrimStrings::class, // Trims strings from the request
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class, // Converts empty strings to null
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class, // Encrypts cookies
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class, // Adds queued cookies to the response
            \Illuminate\Session\Middleware\StartSession::class, // Starts the session
            \Illuminate\View\Middleware\ShareErrorsFromSession::class, // Shares errors from the session
            \App\Http\Middleware\VerifyCsrfToken::class, // Verifies the CSRF token
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // Substitutes bindings
        ],

        'api' => [
//            \App\Http\Middleware\LogRoute::class, // Route logger
//            \App\Http\Middleware\SetSanctumGuard::class, // Select guard depend URL
//            \App\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Ensures frontend requests are stateful
            \App\Http\Middleware\RestoreSessionFromHeaders::class, // Restores session from headers
            \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api', // Throttles requests
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // Substitutes bindings
            \App\Http\Middleware\AddSessionDataToJsonResponse::class, // Add session data to response
        ],
    ];

    /**
     * The application's middleware aliases.
     *
     * Aliases may be used to conveniently assign middleware to routes and groups.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        'auth' => \App\Http\Middleware\Authenticate::class, // Authenticates the user
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class, // Authenticates the user with basic auth
        'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class, // Authenticates the user with session
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class, // Sets cache headers
        'can' => \Illuminate\Auth\Middleware\Authorize::class, // Authorizes the user
        'guest' => \App\Http\Middleware\IsAuthenticated::class, // Checks if the user is authenticated
        'customer' => \App\Http\Middleware\RedirectIfAuthenticated::class, // Redirects if the user is authenticated
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class, // Requires the user's password
        'signed' => \App\Http\Middleware\ValidateSignature::class, // Validates the signature
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class, // Throttles requests
        'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class, // Ensures the email is verified
    ];
}
