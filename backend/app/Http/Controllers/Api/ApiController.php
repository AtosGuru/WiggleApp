<?php

namespace App\Http\Controllers\Api;

use App\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiController extends Controller
{
    /**
     * Default api route, return version
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
     */
    public function version(Request $request)
    {
        Log::info('API version checking');

        return response(['api' => API::VERSION]);
    }
}
