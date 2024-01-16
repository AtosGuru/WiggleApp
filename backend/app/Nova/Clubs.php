<?php

namespace App\Nova;

use App\Models\User2Location;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource;

class Clubs extends Resource { //ClubsStaff

    public static $group = 'Instances';

    public static $globalSearchResults = 10;

    public static $model = User2Location::class;

    public static $title = 'id';

    public static $search = ['id', 'users.email', 'locations.title'];

    public function fields(NovaRequest $request) {

        return [
            BelongsTo::make('Users')->rules('required'),
            BelongsTo::make('Locations')->rules('required'),
        ];

    }

    public function cards(NovaRequest $request)
    {
        return [];
    }

    public function filters(NovaRequest $request)
    {
        return [];
    }

    public function lenses(NovaRequest $request)
    {
        return [];
    }

    public function actions(NovaRequest $request)
    {
        return [];
    }

    /*public function menu(Request $request)
    {
        return parent::menu($request)->withBadge(function () {
            return static::$model::count();
        });
    }*/

}