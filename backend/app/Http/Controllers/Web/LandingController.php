<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Output\StreamOutput;


class LandingController extends Controller
{
    /**
     * @return array
     */
    static function wiggle()
    {
        return ['Wiggle' => app()->version()];
    }

    /**
     * @param string                   $command
     * @return string
     */
    public function artisan(string $command) {
        if (App::environment('production')) {
            abort(403, 'This route is only available in testing environment.');
        }
        ob_start();
        $stream = fopen("php://output", 'wb');
        Artisan::call($command, $_GET, new StreamOutput($stream));
        return '<pre>' . preg_replace('/\n/', '<br/>', \ob_get_clean() . '</pre> Fin.');
    }
}
