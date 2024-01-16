<?php

namespace App\Nova\Panels;

use Laravel\Nova\Panel;

class Place
{
    public static function fields()
    {
        return [
            TRMap::make('Map')->rules('required', 'max:255'),
            TRCountry::make('Country')->rules('required', 'max:255'),
            TRState::make('State')->rules('required', 'max:255'),
            TRCity::make('City')->rules('required', 'max:255'),
            TRZipCode::make('Zip Code')->rules('required', 'max:255'),
            TRAddress::make('Address')->rules('required', 'max:255'),
        ];
    }

    public static function make($name)
    {
        return new Panel($name, self::fields());
    }
}