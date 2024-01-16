<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddSessionDataToJsonResponse
{
    /**
     * @throws \JsonException
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Отримуємо JSON з відповіді
        $content = $response->getContent();
        $json = json_decode($content, true, 512, JSON_THROW_ON_ERROR);

        // Додаємо ID сесії та токен до JSON відповіді
        $json['X-SESSION-ID'] = session()->getId();
        $json['CSRF-TOKEN'] = csrf_token();
        $response->header('X-SESSION-ID', session()->getId());
        $response->header('X-CSRF-TOKEN', csrf_token());

        // Перезаписуємо JSON з відповіді з доданими даними сесії
        $response->setContent(json_encode($json, JSON_THROW_ON_ERROR));

        return $response;
    }
}
