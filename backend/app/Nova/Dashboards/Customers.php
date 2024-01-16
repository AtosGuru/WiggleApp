<?php

namespace App\Nova\Dashboards;

use App\Models\User;
use Laravel\Nova\Dashboard;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Stepanenko3\NovaCards\Cards\HtmlCard;

class Customers extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        $search = app()->request->get('search');

        $customers = User::query()
            ->where('email', 'like', "%{$search}%")
            ->orWhere( 'phone','like', "%{$search}%" )
            ->orderBy('updated_at', 'desc')
            ->take(24)
            ->get();

        $cards = $customers->map(function ($customer) {
            return HtmlCard::make()->view('nova.wiggler.customer', ['customer'=>$customer]);
        });

        return [
            HtmlCard::make()->width('full')->view('nova.wiggler.filter', []),
            ...$cards->all()
        ];
    }

    /**
     * Get the filters available for the dashboard.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @return array
     */
    public function filters(NovaRequest $request)
    {
        return [
            Text::make('Email')
                ->placeholder('Enter email')
                ->nullable(),
        ];
    }

    /**
     * Get the lenses available for the dashboard.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @return array
     */
    public function lenses(NovaRequest $request)
    {
        return [];
    }

    /**
     * Get the actions available for the dashboard.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @return array
     */
    public function actions(NovaRequest $request)
    {
        return [];
    }

}