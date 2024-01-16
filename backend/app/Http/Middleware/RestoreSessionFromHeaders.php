<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class RestoreSessionFromHeaders extends \Illuminate\Session\Middleware\StartSession
{
    /**
     * Get the session implementation from the manager.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Session\Session
     */
    public function getSession(Request $request)
    {
        return tap($this->manager->driver(), function ($session) use ($request) {
            $session->setId($request->header('X-SESSION-ID'));
        });
    }
}