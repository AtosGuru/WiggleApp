<?php

namespace App\Nova;

use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\Image as NovaImage;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;

class Notifications extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Image>
     */
    public static $model = \App\Models\Notify::class;

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
            BelongsTo::make('Partner', 'partner', \App\Nova\User::class)
                ->nullable()
                ->default(function (){
                    return app()->user()->id;
                })
                ->exceptOnForms()
                ->readonly(function () {return $this->resource->exists;})
                ->sortable()
                ->rules('required'),
            Text::make('Title', 'message->title')
                ->readonly(),
            BelongsTo::make('User')
                ->readonly(function () {return $this->resource->exists;})
                ->sortable()
                ->rules('required'),
            Boolean::make('active')
                ->default(function () {return true;})
                ->sortable(),
            KeyValue::make('message')
                ->default(function (){
                    return [
                        "model" => "",
                        "type" => "",
                        "title" => "",
                        "text" => "",
                        "partner_id" => "",
                    ];
                })
                ->rules('json')
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
