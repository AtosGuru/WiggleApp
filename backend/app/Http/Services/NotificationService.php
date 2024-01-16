<?php

namespace App\Http\Services;

use App\Notifications;
use App\Models\User;
use GuzzleHttp\RedirectMiddleware;
use GuzzleHttp\Utils;
use Propaganistas\LaravelPhone\PhoneNumber;

/**
 * Class NotificationService
 *
 * This class is responsible for handling all notifications related tasks.
 * It extends the AbstractService class and provides methods for sending notifications,
 * adding devices, getting notifications and tags for users.
 */
class NotificationService extends AbstractService implements Notifications
{
    public const URI_NOTIFICATIONS = '/notifications';
    public const URI_APPS = '/apps/';
    public const URI_USERS = '/users/';
    public const URI_PLAYERS = '/players';

    /**
     * NotificationService constructor.
     *
     * @param array $config
     */
    public function __construct(array $config = [])
    {
        parent::__construct($config + [
            'allow_redirects' => RedirectMiddleware::$defaultSettings,
            'http_errors' => false,
            'decode_content' => true,
            'verify' => true,
            'headers' => [
                'Authorization' => 'Basic ' . self::ONESIGNAL_REST_API_KEY,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    /**
     * Notify an external user.
     *
     * @param User     $user     The user to be notified
     * @param array    $template The notification template
     * @param int|null $chanel   The notification channel
     *
     * @return mixed
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function notifyExternalUser(User $user, array $template, int $chanel = null): mixed
    {
        // Get the notification channel
        $chanel = $user->getNotifyChanel($chanel);

        // Make the request
        return $this->requestResult(
            'POST',
            self::ONESIGNAL_API_URL . self::URI_NOTIFICATIONS, [
            'body' => Utils::jsonEncode(array_merge($template[$chanel] ?? [],[
                "app_id" => env('ONESIGNAL_APP_ID'),
                "include_external_user_ids" => [$user->profile?->identifier],
            ])),
        ])->getResult();
    }

    /**
     * Set tags for a user.
     *
     * @param User  $user The user to set tags for
     * @param array $tags The tags to set
     *
     * @return mixed
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function tagsForUser(User $user, array $tags): mixed
    {
        // Make the request
        return $this->requestResult('PUT', self::ONESIGNAL_API_URL . self::URI_APPS .env('ONESIGNAL_APP_ID').self::URI_USERS. $user->profile->identifier, [
            'body' => Utils::jsonEncode(["tags"=>$tags]),
        ])->getResult();
    }

    /**
     * Add a device.
     *
     * @param User $user The user to add a device for
     *
     * @return mixed
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function addDevice(User $user): mixed
    {
        // Make the request
        return $this->requestResult(
            'POST',
            self::ONESIGNAL_API_URL . self::URI_PLAYERS,
            [
                'body' => Utils::jsonEncode([
                    "app_id" => env('ONESIGNAL_APP_ID'),
                    "device_type" => request()->email ? Notifications::ONESIGNAL_DEVICE_EMAIL : Notifications::ONESIGNAL_DEVICE_SMS,
                    "notification_types" => Notifications::ONESIGNAL_NOTIFICATION_TYPES_SUBSCRIBED,
                    "identifier" => $user->email ?? (new PhoneNumber($user->phone, $user->profile->geolocation->countryCode))->formatE164(),
                    "external_user_id" => $user->profile->identifier,
                    "tags" => [
                        "first_name" => $user->profile->first_name ?? '',
                        "last_name" => $user->profile->last_name ?? '',
                        "pin" => $user->profile->verify_pin,
                    ],
                    "lat" => $user->profile->geolocation->latitude,
                    "long" => $user->profile->geolocation->longitude,
                    "country" => $user->profile->geolocation->countryCode,
                    "timezone" => $user->profile->geolocation->timezone,
                ]),
            ])->getResult();
    }

    /**
     * Get notifications.
     *
     * @param \App\Models\User $user
     * @param int              $limit  The limit
     *
     * @param int              $offset The offset
     * @return mixed
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function getNotifications(User $user, int $limit = 100, int $offset = 0): mixed
    {
        // Make the request
        return $this->requestResult('GET', self::ONESIGNAL_API_URL . self::URI_NOTIFICATIONS . '?app_id=' . self::ONESIGNAL_APP_ID . '&limit=' . $limit . '&offset=' . $offset . '&external_user_ids='. $user->profile->identifier)
                    ->getResult();
    }

    /**
     * Get a notification.
     *
     * @param string $id The notification ID
     *
     * @return mixed
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function getNotification(string $id): mixed
    {
        // Make the request
        return $this->requestResult('GET', self::ONESIGNAL_API_URL . self::URI_NOTIFICATIONS . '/' . $id . '?app_id='. self::ONESIGNAL_APP_ID)
                    ->getResult(false);
    }

}
