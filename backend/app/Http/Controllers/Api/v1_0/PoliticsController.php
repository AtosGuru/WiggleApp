<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PoliticsController extends Controller
{
    public function __invoke()
    {
        // TODO: Implement __invoke() method.
    }

    public function content(Request $request)
    {
        return [
            'privacy' => [
                "public" => [
                    "title" => "Public terms",
                    "article" => "public",
                ],
                "customer" => [
                    "title" => "Private terms",
                    "article" => "private",
                ],
                "partner" => [
                    "title" => "Partner terms",
                    "article" => "partner",
                ],
            ],
            'terms' => [
                "public" => [
                    "title" => "Public terms",
                    "article" => "public",
                ],
                "customer" => [
                    "title" => "Private terms",
                    "article" => "private",
                ],
                "partner" => [
                    "title" => "Partner terms",
                    "article" => "partner",
                ],
            ],
        ];
    }
}
