<?php

namespace App\Nova;

use App\Nova\Fields\CloudFlareImage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Laravel\Nova\Fields\BelongsToMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Trinityrank\GoogleMapWithAutocomplete\TRMap;

class User extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\User>
     */
    public static $model = \App\Models\User::class;

    public static $group = 'Instances';

    public static $globalSearchResults = 10;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'email';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'email', 'phone', 'profile'
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
            ID::make()
                ->sortable(),

            CloudFlareImage::make('Avatar', 'profile->photos->0')
                ->readonly(function () { return $this->resource->exists; }),
            Text::make('Phone')
                ->sortable()
                ->rules('nullable', 'prohibited_unless:email,null', 'required_without:email', 'phone', 'max:54')
                ->creationRules('nullable', 'prohibited_unless:email,null', 'required_without:email', 'phone', 'max:54', 'unique:users')
                ->updateRules('nullable', 'prohibited_unless:email,null', 'required_without:email', 'unique:users,phone,{{resourceId}}'),
            Text::make('Name')->showOnCreating()//->readonly()
                ->default(function () { return uuid_create(UUID_TYPE_TIME);} ),

            Text::make('Email')
                ->sortable()
                ->rules('nullable', 'prohibited_unless:phone,null', 'required_without:phone', 'email', 'max:254')
                ->creationRules('nullable', 'prohibited_unless:phone,null', 'required_without:phone', 'email', 'max:254', 'unique:users')
                ->updateRules('nullable', 'prohibited_unless:phone,null', 'required_without:phone', 'unique:users,email,{{resourceId}}'),

            Password::make('Password')
                ->onlyOnForms()
                ->creationRules('required', Rules\Password::defaults())
                ->updateRules('nullable', Rules\Password::defaults()),

            KeyValue::make('Profile')
                ->rules('json'),

            KeyValue::make('Geolocation', 'profile->geolocation')
                ->rules('json'),
            TRMap::make('Map', 'profile->geolocation')->onlyOnDetail()
                 ->latitude($this->profile->geolocation->latitude ?? 0)
                 ->longitude($this->profile->geolocation->longitude ?? 0)
                 ->hideLatitude()->hideLongitude()->readonly(),

            Text::make('Photos', function(){
                    return view('nova.gallery', $this->toArray())->render();
                })
                ->hideFromIndex()
                ->hideWhenCreating()
                ->asHtml(),

            BelongsToMany::make('Locations'),
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
