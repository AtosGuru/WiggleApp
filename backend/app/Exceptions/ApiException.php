<?php

namespace App\Exceptions;

use App\Api;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ApiException extends \Exception implements Api
{
    public mixed $response;

    public function __construct($data, $message = self::ERROR_MESSAGE, $code = self::ERROR_STATUS)
    {
        parent::__construct(__($message), $code);

        $this->response = ['status' => Api::STATUS_FAIL] + $data + ['message' => __($message)];
    }

    public static function handler(ApiException $e)
    {
        return response()->json($e->response, $e->getCode());
    }

    public static function http(HttpException $e)
    {
        return response()->json([
            'status' => Api::STATUS_FAIL,
            'message' => $e->getMessage()
        ]);
    }

    public static function reportable(ApiException $e)
    {
        return false;
    }

    public static function log(HttpException $e)
    {
        Log::warning($e->getMessage());
        return false;
    }
}