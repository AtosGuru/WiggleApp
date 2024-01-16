<?php

namespace App\Nova;

use App\Nova\Fields\CloudFlareImage;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Code;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Markdown;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Trinityrank\GoogleMapWithAutocomplete\TRMap;

class Event extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Event>
     */
    public static $model = \App\Models\Event::class;

    public static $group = 'Instances';

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'title';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id','title','description'
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            ID::make()->sortable(),

            CloudFlareImage::make('Image', 'image_id'),
            Text::make('Title')
                ->sortable(),
            Markdown::make('Description')->alwaysShow()
                ->sortable(),

            BelongsTo::make('Location')
                ->searchable()
                ->sortable()
                ->rules('required'),
            TRMap::make('Map', 'location->place')->onlyOnDetail()
                ->latitude($this->location->place->latitude ?? $request->user()->profile->geolocation->latitute ?? 0)
                ->longitude($this->location->place->longitude ?? $request->user()->profile->geolocation->longitute ?? 0)
                ->hideLatitude()->hideLongitude()->readonly(),


            BelongsTo::make('User')
                ->readonly(function () { return $this->resource->exists; })
                ->default(function ($request) {
                    return $request->user()->id ?? null;
                })
                ->filterable()
                ->sortable()
                ->rules('required'),

            HasMany::make('Connection')
                ->readonly(),
            HasMany::make('Images'),

            Code::make('Schedule')
                ->default(function () {
                    return json_encode(json_decode(\App\Models\Event::SCHEDULE, false, 12, JSON_THROW_ON_ERROR), JSON_THROW_ON_ERROR);
                })
                ->json()
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

    /**
     * Get the menu that should represent the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Laravel\Nova\Menu\MenuItem
     */
    public function menu(Request $request)
    {
        return parent::menu($request)->withBadge(function () {
            return static::$model::count();
        });
    }
}
