<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Http\Requests\EventRequest;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class EventController
{
    public function index(): EventCollection
    {
        return new EventCollection(Event::query()->paginate());
    }

    public function personal(): EventCollection
    {
        return new EventCollection(Event::whereHas('connection', function ($query) {
            $query->where('user_id', auth()->user()->id);
            $query->orWhere('partner_id', auth()->user()->id);
        })->get());
    }

    public function single(int $id): EventResource
    {
        return new EventResource(Event::query()->findOrFail($id)?->load('location')->load('images'));
    }

    public function create(EventRequest $request): EventResource
    {
        return new EventResource(Event::query()->create($request->all()));
    }

    public function update(EventRequest $request, int $id): EventResource
    {
        return new EventResource(Event::updateOrCreate(['id' => $id], $request->all()));
    }

    public function delete(int $id): JsonResponse
    {
        return new JsonResponse([
            'status' => Api::STATUS_SUCCESS,
            'result' => Event::query()->find($id)->delete()
        ]);
    }
}