<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\KeyValue;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Ghanem\GoogleMap\GHMap;
use Laravel\Nova\Panel;
use Trinityrank\GoogleMapWithAutocomplete\TRMap;
use YieldStudio\NovaGoogleAutocomplete\AddressMetadata;
use YieldStudio\NovaGoogleAutocomplete\GoogleAutocomplete;

class Location extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Location>
     */
    public static $model = \App\Models\Location::class;

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
        'title', 'place->latitude', 'place->longitude', 'place->place_id'
    ];

    /**
     * Determine if the user can update the given resource.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @return bool
     */
    public function authorizedToUpdate($request)
    {
        return false;
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
            ID::make()->sortable()->onlyOnIndex(),

            TRMap::make('Map', 'place')->onlyOnDetail()
                ->latitude($this->place->latitude ?? 0)
                ->longitude($this->place->longitude ?? 0)
                ->hideLatitude()->hideLongitude(),

            GoogleAutocomplete::make('Address', 'title')
                ->hideWhenUpdating()
                ->withMeta(['language'=>'en'])
                ->withValues([
                    'place_id',
                    'formatted_address',
                    'latitude',
                    'longitude',
                    'postal_code',
                    'country',
                    'locality',
                    'street_number',
                    'route',
                    'administrative_area_level_1',
                    'address_components',
                ])->rules('required'),
            AddressMetadata::make('Components', 'place')
                ->fromValuesAsJson()
                ->onlyOnForms()
                ->invisible(),
            AddressMetadata::make('PlaceID', 'place->place_id')
                ->fromValue('place_id')
                ->onlyOnForms()
                ->invisible(),

            Panel::make('Components panel', $this->addressComponents($request)),

            KeyValue::make('Place', 'place')
                ->rules('json')->hideFromIndex()->hideWhenCreating(),
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

    private function addressComponents($request)
    {
        $addressComponents = $request->input('place.address_components', $this->place->address_components ?? []);

        $fields = [];

        foreach ($addressComponents as $index => $component) {
            $fields[] = KeyValue::make(ucfirst(str_replace('_',' ', implode(', ',$component->types))), 'place.address_components.' . $index)
                                ->keyLabel('Key')
                                ->valueLabel('Value')
                                ->readonly();
        }
        return $fields;
    }
}
