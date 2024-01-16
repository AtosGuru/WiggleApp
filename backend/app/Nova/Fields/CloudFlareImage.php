<?php

namespace App\Nova\Fields;

use App\Http\Services\MediaService;
use Laravel\Nova\Fields\Image;
use Laravel\Nova\Http\Requests\NovaRequest;

class CloudFlareImage extends Image
{
    public function __construct($name, $attribute = null, $disk = null, $storageCallback = null)
    {
        $storageCallback = $storageCallback ?? [$this, 'cloudFlareStorage'];

        parent::__construct($name, $attribute, $disk, $storageCallback);

        $this->deleteCallback = [$this, 'cloudFlareDelete'];
    }

    /**
     * Hydrate the given attribute on the model based on the incoming request.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @param object                                  $model
     * @param                                         $attribute
     * @return array
     */
    protected function cloudFlareStorage(NovaRequest $request, $model, $attribute)
    {
        $flare = MediaService::facade()->upload( $request->file($attribute) );

        if ($attribute === 'id') {
            return [
                $attribute => $flare->result->id ?? $model->{$attribute},
                'meta' => $flare->result ?? $model->meta,
            ];
        }

        if ($model instanceof \App\Models\Image) {
            return $flare->result->id ?? $model->{$attribute};
        }

        \App\Models\Image::query()->create([
            'id' => $flare->result->id,
            'user_id' => $request->user()->id
        ]);

        return $flare->result->id ?? $model->{$attribute};
    }

    protected function cloudFlareDelete(NovaRequest $request, $model) {
        return MediaService::facade()->delete($model->id);
    }
}