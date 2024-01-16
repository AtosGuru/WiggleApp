<?php

namespace App\Observers;

use App\Connection as ConnectionAlias;
use App\Models\Connection;
use App\Models\Notify;
use App\Notifications;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class ConnectionObserver
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
     * @param \App\Models\Connection $connection
     * @return void
     */
    public function created(Connection $connection): void
    {
        Log::info('Event Connection created...');

        if (in_array($connection->type, ConnectionAlias::TYPES_DOUBLESIDE)) {
            $this->notificator($connection);
        }
    }

    /**
     * Handle the Connection "updated" event.
     *
     * @param \App\Models\Connection $connection
     * @return void
     */
    public function updated(Connection $connection): void
    {
        Log::info('Event Connection updated...');

        if ($connection->type !== ConnectionAlias::TYPE_MESSAGE_READ) {
            $this->notificator($connection);
        }
    }

    /**
     * Get the receiver User object based on the Connection and current authenticated user.
     *
     * @param Connection $connection The Connection object representing the relationship between users.
     * @return \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Relations\BelongsTo The receiver User object.
     */
    private function getReceiver (Connection $connection): Model|BelongsTo
    {
        return auth()->user()->id === $connection->partner_id
            ? $connection->user()->firstOrFail()
            : $connection->partner()->firstOrFail();
    }

    /**
     * Create personal notification.
     *
     * @param \App\Models\Connection $connection
     * @return void
     */
    private function notificator(Connection $connection): void
    {
        $receiver = $this->getReceiver($connection);

        if (!($receiver->profile->identifier ?? false)) return;

        Notify::query()->create([
            "token" => $receiver->profile->identifier,
            "message" => [
                "title" => Notifications::NEW_CONNECTION[$connection->type][Notifications::ONESIGNAL_DEVICE_EMAIL]['name'],
                "model" => get_class($connection),
                "model_id" => $connection->id,
                "type" => (int)$connection->type,
                "partner_id" => $receiver->id === $connection->user_id
                    ? (int)$connection->partner_id
                    : (int)$connection->user_id,
            ],
            "user_id" => $receiver->id,
        ]);
    }
}
