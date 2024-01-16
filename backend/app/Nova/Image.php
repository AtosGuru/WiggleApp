<?php

namespace App\Nova;

use App\Http\Services\MediaService;
use App\Nova\Fields\CloudFlareImage;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Date;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Image extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Image>
     */
    public static $model = \App\Models\Image::class;

    public static $group = 'Instances';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'id';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id'
    ];

    public static function indexQuery(NovaRequest $request, $query)
    {
        return $query->orderBy($request->get('images_order', 'updated_at'), $request->get('images_direction', 'desc'));
    }

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            Date::make('updated_at')
                ->sortable()
                ->hide(),
            CloudFlareImage::make('Image','id')
                ->readonly(function () { return $this->resource->exists; }),
            Text::make('id')
                ->hideWhenCreating()
                ->readonly()
                ->sortable(),
            BelongsTo::make('User')
                ->filterable()
                ->readonly(function () { return $this->resource->exists; })
                ->default(function($request) {
                    return $request->user()->id ?? null;
                })
                ->sortable()
                ->rules('required'),
            BelongsTo::make('Event')
                ->searchable()
                ->filterable()
                ->readonly(function () { return $this->resource->exists; })
                ->nullable()
                ->sortable(),
            Boolean::make('active')
                ->default(1)
                ->sortable(),
            KeyValue::make('Meta')
                ->rules('json'),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function cards(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function filters(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [];
    }

    private function uploadImage(NovaRequest $request)
    {
        if (!$request->file) return;

        $request->validate([
            'id' => ['required', 'file'],
        ]);

        $flare = MediaService::facade()->upload($request);

        $request->id = $flare->result->id ?? $this->id ?? null;
        $request->meta = $flare->result ?? $this->meta ?? null;
    }
}
