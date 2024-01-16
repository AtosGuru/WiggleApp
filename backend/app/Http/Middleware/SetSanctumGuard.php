<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class SetSanctumGuard
{
    public function handle($request, Closure $next)
    {
        if (Str::startsWith($request->getRequestUri(), '/api/admin/')) {
            config(['sanctum.guard' => 'web']);
        } elseif (Str::startsWith($request->getRequestUri(), '/api/')) {
            config(['sanctum.guard' => 'api']);
        }

        return $next($request);
    }
}