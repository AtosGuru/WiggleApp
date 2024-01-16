<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Connection as ConnectionAlias;
use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageCollection;
use App\Http\Resources\MessageResource;
use App\Models\Connection;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class MessagesController extends Controller
{
    public function index(MessageRequest $request)
    {
        return (new MessageCollection(
            Message::with('user')
                ->whereHas('connection', function ($query) {
                    $query->where('user_id', auth()->user()->id);
                    $query->orWhere('partner_id', auth()->user()->id);
                })
                ->where( $request->search() )->orderByDesc('updated_at')->paginate()
        ));
    }

    public function single($id)
    {
        return new MessageCollection(Message::whereHas('connection', function ($query) use ($id) {
            $query->where('id',$id);
            $query->where(function ($query) {
                $query->where('user_id', auth()->user()->id);
                $query->orWhere('partner_id', auth()->user()->id);
            });
        })->orderByDesc('updated_at')->paginate());
    }

    public function create(MessageRequest $request): MessageResource
    {
        Log::info('Customers message...');

        return (new MessageResource(
            Message::query()->create([...$request->all(),'user_id'=>auth()->user()->id])->first(),
        ))->additional([
            'connection_id' => $request->connection_id,
            'read_update' => Connection::query()
                ->without('messages')
                ->where('type', ConnectionAlias::TYPES_UPDATABLE)
                ->updateOrCreate(
                    ['type' => ConnectionAlias::TYPE_MESSAGE_READ, 'connection_id' => $request->connection_id, 'user_id' => $request->user()->id],
                    ['type' => ConnectionAlias::TYPE_MESSAGE_READ, 'connection_id' => $request->connection_id, 'user_id' => $request->user()->id, 'updated_at' => now()]
                ),
        ]);
    }

    public function update(MessageRequest $request, int $id): MessageResource
    {
        Log::info('Update message...');

        return new MessageResource(Message::query()->where(['id' => $id])->update($request->all()) );
    }

    public function delete(int $id): JsonResponse
    {
        Log::info('Delete message:' . $id);

        return new JsonResponse([
            'status' => Api::STATUS_SUCCESS,
            'result' => Connection::query()->findOrFail($id)?->delete()
        ]);
    }
}
