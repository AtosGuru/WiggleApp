<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Http\Resources\LocationCollection;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use GuzzleHttp\Utils;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class LocationController extends Controller
{
    public function index(): LocationCollection
    {
        return new LocationCollection(Location::query()->paginate());
    }

    public function single(LocationRequest $request, $id): LocationResource
    {
        Log::info('Find Location:' . $id);

        return new LocationResource(Location::findOrFail($id));
    }

    public function nearbe(): LocationCollection
    {

    }

    public function update(LocationRequest $request, int $id): LocationResource
    {
        Log::info('Update Location...');

        $location = Location::find($id);
        $request->place = Utils::jsonDecode($request->place ?? '[]', true) + (array)$location->place;

        return new LocationResource(Location::updateOrCreate(['id' => $id], $request->all()));
    }

    public function delete(int $id): JsonResponse
    {
        Log::info('Delete Location:' . $id);

        return new JsonResponse([
            'status' => Api::STATUS_SUCCESS,
            'result' => Location::query()->find($id)->delete()
        ]);
    }
}