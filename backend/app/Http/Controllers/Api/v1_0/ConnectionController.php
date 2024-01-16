<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\ConnectionRequest;
use App\Http\Resources\ConnectionCollection;
use App\Http\Resources\ConnectionResource;
use App\Models\Connection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ConnectionController extends Controller implements \App\Connection
{
    public function index(ConnectionRequest $request): ConnectionCollection
    {
        Log::info('User connection list...');
        return new ConnectionCollection(
            Connection::query()->where($request->doubleside())->paginate(1000)
                ->load('user')
        );
    }

    public function chats(ConnectionRequest $request): ConnectionCollection
    {
        Log::info('User connection list...');
        return new ConnectionCollection(
            Connection::query()
                ->where($request->doubleside())
                ->where(['type'=>self::TYPE_CHAT])
                ->paginate(1000)
                ->load('user')
        );
    }

    public function single(ConnectionRequest $request, int $id = null): ConnectionResource
    {
        Log::info('Find connection...');
        return new ConnectionResource(
            Connection::query()->where($request->valid($id))->first()
        );
    }

    public function create(ConnectionRequest $request): ConnectionResource
    {
        Log::info('New customers connection. Type:' . $request->type);

        return new ConnectionResource(
            Connection::query()->firstOrCreate([...$request->all(),'user_id' => $request->user()->id])
        );
    }

    public function upgrade(ConnectionRequest $request, int $id): JsonResponse
    {
        Log::info('Upgrade connection type:' . $request->type);

        return new JsonResponse(
            Connection::query()
                ->updateOrCreate(['id' => $id],$request->except('partner_id', 'user_id'))
                ->where('type', self::TYPES_UPGRADABLE)
        );
    }

    public function update(ConnectionRequest $request, int $id)//: ConnectionResource
    {
        Log::info('Update connection:' . $request->type);

        return new JsonResponse([
            'connection' => Connection::query()
                ->updateOrCreate(
                    ['type'=>$request->type, 'connection_id' => $id, 'user_id'=>$request->user()->id],
                    ['updated_at' => now(), ...$request->except('partner_id'), 'connection_id' => $id, 'user_id'=>$request->user()->id])
                ->where('type', self::TYPES_UPDATABLE)->get(),
        ]);
    }

    public function delete(int $id): JsonResponse
    {
        Log::info('Delete connection:' . $id);

        return new JsonResponse([
            'status'=> Api::STATUS_SUCCESS,
            'result' => Connection::query()->findOrFail($id)?->delete()
        ]);
    }
}
