<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\AllUsers;
use App\Nova\Metrics\AllClubs;
use App\Nova\Metrics\DownloadsApplication;
use App\Nova\Metrics\OnlineUsers;
use Laravel\Nova\Dashboards\Main as Dashboard;

class Main extends Dashboard
{
    /**
     * Get the displayable name of the dashboard.
     *
     * @return string
     */
    public function name()
    {
        return 'Analytics';
    }

    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new DownloadsApplication,
            new AllUsers,
            new AllClubs,
            new OnlineUsers,
        ];
    }
}
