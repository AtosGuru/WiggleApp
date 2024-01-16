<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Logging\JsonResponseLogChannel;

class AddDebugToJsonResponse
{
    /**
     * @throws \JsonException
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if (env('app_env') !== 'production') {
            // Отримуємо JSON з відповіді
            $content = $response->getContent();
            $json = json_decode($content, true, 512, JSON_THROW_ON_ERROR);

            // Додаємо ID сесії та токен до JSON відповіді
            $json['DEBUG'] = JsonResponseLogChannel::getDump();

            // Перезаписуємо JSON з відповіді з доданими даними сесії
            $response->setContent(json_encode($json, JSON_THROW_ON_ERROR));
        }

        return $response;
    }
}
