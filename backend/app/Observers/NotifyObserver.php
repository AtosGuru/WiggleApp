<?php

namespace App\Observers;

use App\Http\Services\NotificationService;
use App\Models\Notify;
use App\Notifications;
use Illuminate\Support\Facades\Log;

class NotifyObserver
{
    /**
     * Handle events after all transactions are committed.
     *
     * @var bool
     */
    public $afterCommit = true;

    /**
     * Handle the Connection "created" event.
     *
     * @param \App\Models\Notify $notify
     * @return void
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function created(Notify $notify): void
    {
        Log::info('Event Notify for user ' . $notify->user_id . ' created...');

        NotificationService::facade()->notifyExternalUser($notify->user()->firstOrFail(), Notifications::NEW_CONNECTION[$notify->message->type]);
    }
}
