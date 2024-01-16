<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Exceptions\ApiException;
use App\Http\Controllers\Controller;
use App\Http\Services\MediaService;
use App\Models\Image;
use GuzzleHttp\Utils;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{

    public function archive(Request $request): Response
    {
        $flare = MediaService::facade()->list();

        return response([
            'status' => Api::STATUS_SUCCESS,
            'cloudflare' => $flare,
        ]);
    }
    public function index(Request $request, string $id = null): Response
    {
        $valid = validator(['id' => $id], [
            'id' => ['nullable', 'exists:users'],
        ])->validate();

        $media = Image::where(['user_id' => $valid->id ?? $request->user()->id])->get();
        return response([
            'status' => Api::STATUS_SUCCESS,
            'media' => $media,
        ]);
    }
    public function storage(Request $request): Response
    {
        //$clean = $this->clean($request);

        $flare = MediaService::facade()->storage();

        Image::query()->create([
            'id' => $flare->result->id,
            'user_id'=>$request->user()->id
        ]);

        Log::info('New upload link generated...');

        return response([
            'status' => Api::STATUS_SUCCESS,
            'cloudflare' => $flare->result,
//            'clean' => $clean,
            $request->user()->id => Auth::id(),
        ]);
    }

    public function update(Request $request, string $id): Response
    {
        $valid = validator(['id' => $id] + $request->all(), [
            'id' => ['required', 'alpha_dash:ascii', 'exists:images'],
            'meta' => ['nullable', 'json'],
        ])->validate();

        $flare = MediaService::facade()->details($valid['id']);
        if ($flare->result?->draft ?? true) {
            throw new ApiException(['cloudflare' => $flare],'The image still not uploaded to the cloud service');
        }

        $media = Image::where(['user_id' => $valid->id ?? $request->user()->id])->findOrFail($valid['id']);
        $media->active = true;
        $media->meta = Utils::jsonDecode($valid->meta ?? '[]', true) + (array)$flare->result + ($media->meta ?? []);
        $media->save();

        return response([
            'status' => Api::STATUS_SUCCESS,
            'imageURL' => 'https://imagedelivery.net/wXG-Ds-607bgN2v8An8cmw/'. $media->id,
            'cloudflare' => $flare,
            'media' => $media,
        ]);
    }


    /**
     * @throws \Illuminate\Validation\ValidationException
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function delete (Request $request, $id): Response
    {
        $valid = validator(['id' => $id], [
            'id' => ['required', 'alpha_dash:ascii', 'exists:images'],
        ])->validate();

        $flare = MediaService::facade()->delete($valid['id']);

        $media = Image::where(['id' => $valid['id'], 'user_id' => $request->user()->id])->get();
        $media->delete();

        return response([
            'status' => Api::STATUS_SUCCESS,
            'cloudflare' => $flare,
        ]);
    }

    /**
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function clean(Request $request): array
    {
        $media = Image::where(['user_id' => $request->user()->id, 'active' => false])->get();

        $flare = [];
        foreach ($media as $image) {
            $flare_valid = MediaService::facade()->details($image->id);
            if ($flare_valid->result?->draft ?? true) {
                try {
                    $flare[] = MediaService::facade()->delete($image->id);
                }
                catch (\Exception $e) {
                    $flare[] = ['error' => $e->getMessage()];
                }
                $image->delete();
                continue;
            }

            $image->active = true;
            $image->save();
        }

        return $flare;
    }
}
