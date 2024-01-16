<?php

namespace App\Observers;

use App\Http\Services\NotificationService;
use App\Models\Message;
use App\Notifications;
use Illuminate\Support\Facades\Log;

class MessageObserver
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
     * @param \App\Models\Message $message
     * @return void
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function created(Message $message): void
    {
        Log::info('Observer message creation');

        NotificationService::facade()
            ->notifyExternalUser($message->connection()->first()->partner()->firstOrFail(), Notifications::NEW_MESSAGE[Notifications::ONESIGNAL_DEVICE_ANDROID]);
    }
}
