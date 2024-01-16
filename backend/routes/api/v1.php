<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/csrf', [\App\Http\Controllers\Api\v1_0\CsrfTokenController::class, 'show'])
    ->name('api.csrf');
Route::get('/policy', [\App\Http\Controllers\Api\v1_0\PoliticsController::class, 'content'])
    ->name('api.content.policy');

Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::get('/user', [\App\Http\Controllers\Api\v1_0\CustomerController::class, 'user']);
    Route::post( '/user', [\App\Http\Controllers\Api\v1_0\CustomerController::class, 'update']);
    Route::get('/user/{id}', [\App\Http\Controllers\Api\v1_0\CustomerController::class, 'customer']);
    Route::get('/users', [\App\Http\Controllers\Api\v1_0\CustomerController::class, 'index']);
    Route::post( '/user/profile', [\App\Http\Controllers\Api\v1_0\CustomerController::class, 'profile']);
    Route::delete('/user/delete', [\App\Http\Controllers\Api\v1_0\CustomerController::class, 'delete'])->name('delete');

    Route::group(['prefix'=>'notify'], static function() {
        Route::get( '/personal/{token?}', [\App\Http\Controllers\Api\v1_0\NotifyController::class, 'personal']);
        Route::put( '/personal/{id}', [\App\Http\Controllers\Api\v1_0\NotifyController::class, 'update']);
        Route::delete( '/personal/{token}', [\App\Http\Controllers\Api\v1_0\NotifyController::class, 'delete']);
        Route::get( '/{id}', [\App\Http\Controllers\Api\v1_0\NotifyController::class, 'single']);
        Route::get( '/', [\App\Http\Controllers\Api\v1_0\NotifyController::class, 'index']);
    });

    Route::group(['prefix'=>'connection'], static function() {
        Route::get('/', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'index']);
        Route::get('/{id}', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'single']);
        Route::post('/', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'create']);
        Route::post('/{id}', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'upgrade']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'delete']);
    });

    Route::group(['prefix'=>'chat'], static function() {
        Route::get('/', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'chats'])->name('chat.index');
        Route::get('/search', [\App\Http\Controllers\Api\v1_0\MessagesController::class, 'index'])->name('message.search');
        Route::get('/{id}', [\App\Http\Controllers\Api\v1_0\MessagesController::class, 'single'])->name('message.single');
        Route::post('/', [\App\Http\Controllers\Api\v1_0\MessagesController::class, 'create'])->name('message.create');
        Route::post('/{id}', [\App\Http\Controllers\Api\v1_0\MessagesController::class, 'update'])->name('message.update');
        Route::post('/at/{id}', [\App\Http\Controllers\Api\v1_0\ConnectionController::class, 'update'])->name('message.reads.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\v1_0\MessagesController::class, 'delete'])->name('message.delete');
    });

    Route::group(['prefix'=>'image'], static function() {
        Route::get( '/archive', [\App\Http\Controllers\Api\v1_0\ImageController::class, 'archive']);
        Route::get( '/index/{user?}', [\App\Http\Controllers\Api\v1_0\ImageController::class, 'index'])->name('media.customer.list');
        Route::get( '/storage', [\App\Http\Controllers\Api\v1_0\ImageController::class, 'storage'])->name('medial.upload.link');
        Route::put( '/{id}', [\App\Http\Controllers\Api\v1_0\ImageController::class, 'update'])->name('medial.upload.confirm');
        Route::delete( '/{id}', [\App\Http\Controllers\Api\v1_0\ImageController::class, 'delete'])->name('media.delete');
    });

    Route::group(['prefix' => 'event'], static function () {
        Route::get('/', [\App\Http\Controllers\Api\v1_0\EventController::class, 'index'])->name('event.index');
        Route::get('/personal', [\App\Http\Controllers\Api\v1_0\EventController::class, 'personal'])->name('event.personal');
        Route::get('/{id}', [\App\Http\Controllers\Api\v1_0\EventController::class, 'single'])->name('event.single');
        Route::post('/', [\App\Http\Controllers\Api\v1_0\EventController::class, 'create'])->name('event.create');
        Route::post('/{id}', [\App\Http\Controllers\Api\v1_0\EventController::class, 'update'])->name('event.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\v1_0\EventController::class, 'delete'])->name('event.delete');
    });

    Route::group(['prefix' => 'location'], static function () {
        Route::get('/', [\App\Http\Controllers\Api\v1_0\LocationController::class, 'index'])->name('location.index');
        Route::get('/{id}', [\App\Http\Controllers\Api\v1_0\LocationController::class, 'index'])->name('location.single');
        Route::post('/{id}', [\App\Http\Controllers\Api\v1_0\LocationController::class, 'update'])->name('location.update');
        Route::delete('/{id}', [\App\Http\Controllers\Api\v1_0\LocationController::class, 'delete'])->name('location.delete');
    });

});