<?php

namespace App\Exceptions;

use App\Api;

class ApiDependencyException extends ApiException
{
    public function __construct($data, $message = self::ERROR_MESSAGE_DEPENDENCY, $code = self::ERROR_STATUS_DEPENDENCY)
    {
        parent::__construct($data, $message, $code);
    }
}