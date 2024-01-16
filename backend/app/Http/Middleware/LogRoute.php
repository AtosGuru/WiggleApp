<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogRoute
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $log = [
            'URI' => $request->getUri(),
            'METHOD' => $request->getMethod(),
            'REQUEST_HEADERS' => json_encode((array)$request->headers),
            'REQUEST_BODY' => $request->all(),
            'RESPONSE' => $response->getContent(),
            'RESPONSE_HEADERS' => json_encode((array)$response->headers),
        ];

        Log::debug($log);

        return $response;
    }
}