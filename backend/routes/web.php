<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\LandingController as LandingControllerAlias;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LandingControllerAlias::class, 'wiggle'])->name('landing');

// Web artisan routes mirror
Route::get('/artisan/{command}', [LandingControllerAlias::class, 'artisan'])->name('artisan.command');
