<?php

namespace App\Providers;

use App\Models\Connection;
use App\Models\Message;
use App\Models\Notify;
use App\Observers\ConnectionObserver;
use App\Observers\MessageObserver;
use App\Observers\NotifyObserver;
use Illuminate\Support\ServiceProvider;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
//        Connection::observe(ConnectionObserver::class);
//        Notify::observe(NotifyObserver::class);
//        Message::observe(MessageObserver::class);
    }
}
