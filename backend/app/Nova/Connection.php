<?php

namespace App\Nova;

use App\Connection as ApiConnection;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Http\Requests\NovaRequest;

class Connection extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Connection>
     */
    public static $model = \App\Models\Connection::class;

    public static $group = 'Relations';

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
        'id',
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

            Select::make('Type')
                ->sortable()
                ->options(function(){
                    return match (true) {
                        in_array($this->type, ApiConnection::TYPES_UPGRADABLE, true) => ApiConnection::TYPE_TITLES_UPGRADABLE[$this->type],
                        default => ApiConnection::TYPE_TITLES,
                    };
                })
                ->readonly(function () {
                    return $this->resource->exists && !in_array($this->type, ApiConnection::TYPES_UPGRADABLE, true);
                })
                ->displayUsingLabels()
                ->filterable(),

            BelongsTo::make('User')
                ->sortable()
                ->rules('required'),

            BelongsTo::make('Partner', 'partner', User::class)
                ->sortable()
                ->rules('required'),

            BelongsTo::make('Event')
                ->readonly()
                ->sortable()
                ->rules('required'),

            HasMany::make('Messages')
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
}
