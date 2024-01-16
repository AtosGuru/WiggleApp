<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\NotifyCollection;
use App\Http\Services\NotificationService;
use App\Models\Notify;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

/**
 * Class NotifyController
 *
 * This class is responsible for handling the requests related to notifications.
 * It contains two methods: list and single.
 *
 * @package App\Http\Controllers\Api\v1_0
 */
class NotifyController extends Controller
{
    /**
     * This method is responsible for retrieving a list of notifications for a given user.
     *
     * @param Request $request The request object.
     * @return Response The response object.
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function index(Request $request): Response
    {
        // Logging the request.
        Log::debug('Notification list for user ' . $request->user()?->id);

        // Retrieving the notifications.
        $notifications = NotificationService::facade()->getNotifications($request->user(),$request->limit ?: 50, $request->offset ?: 0);

        // Returning the response.
        return response([
            'status' => Api::STATUS_SUCCESS,
            'notifications' => $notifications,
        ]);
    }

    /**
     * This method is responsible for retrieving a single notification for a given user.
     *
     * @param Request $request The request object.
     * @param string  $id      The notification id.
     * @return Response The response object.
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function single(Request $request, string $id): Response
    {
        // Retrieving the notification.
        $notification = NotificationService::facade()->getNotification($id);

        // Returning the response.
        return response([
            'status' => Api::STATUS_SUCCESS,
            'notification' => $notification,
        ]);
    }

    /**
     * List of personal notifications
     * @param \Illuminate\Http\Request $request
     * @param string                   $token
     */
    public function personal(Request $request, string $token = '')
    {
        return (new NotifyCollection(
            Notify::query()
                ->where('active', 1)
                ->where(function($query) use ($token) {
                    if (env('APP_ENV')!=='production') {
                        $query->orWhere(is_numeric($token) ? ['user_id' => $token] : ['token' => $token]);
                    }
                })
                ->orWhere('user_id', $request->user()?->id)
                ->orderByDesc('created_at')
                ->get()
        ))->additional([
            'debug_token' => $token
        ]);
    }

    /**
     * Update notification activity
     * @param \Illuminate\Http\Request $request
     * @param string                   $id
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, string $id): Response
    {
        validator([
                'id' => $id,
            ], [
                'id' => [
                    'required',
                    Rule::exists('notifies', is_numeric($id) ? 'id' : 'token')
                        ->where(function ($query) use ($request) {
                            $query->where('user_id', $request->user()?->id);
                        })
                ],
            ])->validate();

        $notifies = Notify::query()
            ->where(is_numeric($id) ? 'id' : 'token', $id)
            ->where(['user_id' => $request->user()?->id])
            ->get();
        foreach ($notifies as $notify) {
            $notify->update(['active'=>0]);
        }

        return response([
            'status' => Api::STATUS_SUCCESS,
            'notification' => $notifies,
            'count' => $notifies->count(),
        ]);
    }

    /**
     * Delete notification(s) by id/token
     * @param \Illuminate\Http\Request $request
     * @param string                   $id
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function delete(Request $request, string $id): Response
    {
        validator([
            'id' => $id,
        ], [
            'id' => [
                'required',
                Rule::exists('notifies', is_numeric($id) ? 'id' : 'token')
                    ->where(function ($query) use ($request) {
                        $query->where('user_id', $request->user()?->id);
                    })
            ],
        ])->validate();

        $notifies = Notify::query()
                          ->where(is_numeric($id) ? 'id' : 'token', $id)
                          ->where(['user_id' => $request->user()?->id])
                          ->get();
        foreach ($notifies as $notify) {
            $notify->delete();
        }

        return response([
            'status' => Api::STATUS_SUCCESS,
            'notification' => $notifies,
            'count' => $notifies->count(),
        ]);
    }
}

