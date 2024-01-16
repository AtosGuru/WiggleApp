<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Class CsrfTokenController
 *
 * This class is responsible for generating and returning a new CSRF token
 *
 * @package App\Http\Controllers\Api\v1_0
 */
class CsrfTokenController extends Controller
{
    /**
     * Generates and returns a new CSRF token
     *
     * @param \Illuminate\Http\Request $request The request object
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        session()->regenerateToken();

        // Return the success response
        // with new CSRF token (merged in middleware app/Http/Middleware/AddSessionDataToJsonResponse)
        return response([
            'status' => Api::STATUS_SUCCESS
        ]);
    }

}
