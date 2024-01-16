<?php

namespace App\Nova\Dashboards;

use Laravel\Nova\Dashboard;
use Stepanenko3\NovaCards\Cards\CacheCard;
use Stepanenko3\NovaCards\Cards\EnvironmentCard;
use Stepanenko3\NovaCards\Cards\GreeterCard;
use Stepanenko3\NovaCards\Cards\HtmlCard;
use Stepanenko3\NovaCards\Cards\LinkableCard;
use Stepanenko3\NovaCards\Cards\ScheduledJobsCard;
use Stepanenko3\NovaCards\Cards\SslCard;
use Stepanenko3\NovaCards\Cards\VersionsCard;
use Stepanenko3\NovaCards\Cards\WorldClockCard;

class System extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        $user = auth()->user();

        return [
            GreeterCard::make()
                       ->user(
                           name: $user->name,
                           title: 'Admin',
                       )
                       ->message(
                           text: 'Welcome back,',
                       )
                       ->button(
                           name: 'Profile',
                           target: '/nova/resources/users/' . $user->id,
                       )
                       ->button(
                           name: 'Users',
                           target: '/nova/resources/users',
                       )
                       ->avatar(
                           url: $user->avatar
                               ? storage_url($user->avatar, 'public')
                               : 'https://ui-avatars.com/api/?size=300&color=7F9CF5&background=EBF4FF&name=' . $user->name
                       ),

//            (new CalendarCard()),

            CacheCard::make(),


            ScheduledJobsCard::make()
                ->startPolling() // Optional. Auto start polling
                ->pollingTime(60000)
                ->width('1/3'),

            EnvironmentCard::make(),

            SslCard::make()
                ->domain('wigglerapp.com'), // Required

//            (new PercentageCard())
//                ->name('Demo percents') // Optional
//                ->label('$') // Optional
//                ->count(33) // Required
//                ->total(1000) // Required
//                ->percentagePrecision(2), // Default: 2
//
//            (new CountdownCard())
//                ->to(now()->addDays(30)) // Required
//                ->title('30 Days Later') // Optional
//                ->label('30 Days Later'), // Optional

            WorldClockCard::make()
                ->timezones([ // Required
                    'Europe/Kiev',
                    'Europe/Berlin',
                    'America/new_york',
                    'America/los_angeles',
                ])
                ->title(__('World Clock')), // Optional

            // A more complex embed of raw <iframe>...</iframe> HTML
//            EmbedCard::make()
//                ->withoutPadding() // Optional remove padding in card
//                ->url('https://www.youtube.com/embed/WhWc3b3KhnY'), // Required

            VersionsCard::make()
                        ->width('2/3'),

//            HtmlCard::make()
//                ->width('2/3')
//                ->html('<h1>Hello World!</h1>'), // Required

//            HtmlCard::make()
//                ->width('1/3')
//                ->view('nova.wiggler.icon', ['name' => 'World']), // Required

            LinkableCard::make()
                ->title('API Docs') // Required
                ->subtitle('Wiggler API documentation') // Optional
                ->url('https://wiggle.lutsk.site/index.html') // Required
                ->target('_blank'), // Default: _self
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'system';
    }
}
