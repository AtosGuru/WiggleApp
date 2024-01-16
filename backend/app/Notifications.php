<?php

namespace App;

interface Notifications
{
    public const WORK_PHONE = "+15854605525";
    /**
     * ONE SIGNAL
     */
    public const ONESIGNAL_API_URL = 'https://onesignal.com/api/v1';
    public const ONESIGNAL_APP_ID = '930b6ff3-618f-4783-842a-0707b4ae6f66';
    public const ONESIGNAL_REST_API_KEY = 'NDk4Y2I2OTctYmVmMy00ODVkLTkxNDUtYmE3ZTdjNmQ4NGJm';
    public const ONESIGNAL_DEVICE_IOS = 0;
    public const ONESIGNAL_DEVICE_ANDROID = 1;
    public const ONESIGNAL_DEVICE_AMAZON = 2;
    public const ONESIGNAL_DEVICE_WINDOWSPHONE = 3;
    public const ONESIGNAL_DEVICE_CHROME_APPS_EXTENSIONS = 4;
    public const ONESIGNAL_DEVICE_CHROME_WEB_PUSH = 5;
    public const ONESIGNAL_DEVICE_WINDOWS = 6;
    public const ONESIGNAL_DEVICE_SAFARI = 7;
    public const ONESIGNAL_DEVICE_FIREFOX = 8;
    public const ONESIGNAL_DEVICE_MACOS = 9;
    public const ONESIGNAL_DEVICE_ALEXA = 10;
    public const ONESIGNAL_DEVICE_EMAIL = 11;
    public const ONESIGNAL_DEVICE_HUAWEI = 13;
    public const ONESIGNAL_DEVICE_SMS = 14;

    public const ONESIGNAL_NOTIFICATION_TYPES_SUBSCRIBED = 1 ;
    public const ONESIGNAL_NOTIFICATION_TYPES_UNSUBSCRIBED = 2;

//    public const IMPORTANCE_PERMANENT = "All Email Subscribers";
//    public const IMPORTANCE_MOBILE = "All SMS Subscribers";
    public const IMPORTANCE_SUBSCRIBED = "Subscribed Users";
    public const IMPORTANCE_INACTIVE = "Inactive Users";
    public const IMPORTANCE_ENGAGED = "Engaged Users";
    public const IMPORTANCE_ACTIVE = "Active Users";

    public const NOTIFICATION_PIN = [
        self::ONESIGNAL_DEVICE_EMAIL => [
            "name" => "Device verification pin",
            "email_subject" => "Device verification pin",
            "channel_for_external_user_ids" => "email",
            "target_channel" => "email",
            "template_id" => "cea77be1-bda6-4ba8-a722-913b0f222c49",
        ],
        self::ONESIGNAL_DEVICE_SMS => [
            "name" => "Device verification pin",
            "channel_for_external_user_ids" => "sms",
            "target_channel" => "sms",
            "sms_from" => self::WORK_PHONE,
            "template_id" => "91c021e3-6b64-432b-bca0-ab2bef2614e8",
            "contents" => ["en"=>"Wiggle say: {{pin}}"],
        ]
    ];

    public const NEW_MESSAGE = [
        self::ONESIGNAL_DEVICE_IOS => [
            "name" => "New message in chat",
            "email_subject" => "New message in chat",
            "template_id" => "a2333499-4c8d-4156-bc37-356ed322408a",
            "data" => [
                "contents" => ["en" => "English Message"],
                "headings" => ["en" => "English Title"],
                "target_channel" => "push",
                "include_aliases" => [
                    "external_id" => []
                ]
            ]
        ],
        self::ONESIGNAL_DEVICE_ANDROID => [
            "name" => "New message in chat",
            "target_channel" => "push",
            "sms_from" => self::WORK_PHONE,
            "template_id" => "a2333499-4c8d-4156-bc37-356ed322408a",
            "contents" => ["en" => "Wiggle say: {{pin}}"],
        ]
    ];

    public const NEW_CONNECTION = [
        Connection::TYPE_BLOCKED => [
            self::ONESIGNAL_DEVICE_EMAIL => [
                "template_id" => "b58c5a2f-eede-4bdf-a021-cf90e7a8b0ce",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_BLOCKED],
                "target_channel" => "email",
                "email_subject" => Connection::TYPE_TEXTS[Connection::TYPE_BLOCKED],
            ],
            self::ONESIGNAL_DEVICE_SMS => [
                "template_id" => "a27aceb5-0708-4123-9e69-1e514df933d4",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_BLOCKED],
                "target_channel" => "sms",
                "sms_from" => self::WORK_PHONE,
                "contents" => ["en" => Connection::TYPE_TEXTS[Connection::TYPE_BLOCKED],],
            ]
        ],
        Connection::TYPE_FOLLOW => [
            self::ONESIGNAL_DEVICE_EMAIL => [
                "template_id" => "ad8ab3a0-5f92-428b-8dfb-2c0affe368a6",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_FOLLOW],
                "target_channel" => "email",
                "email_subject" => Connection::TYPE_TEXTS[Connection::TYPE_FOLLOW],
            ],
            self::ONESIGNAL_DEVICE_SMS => [
                "template_id" => "f0cc9787-dbf7-4f0d-ad68-aa45f9b8d1ef",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_FOLLOW],
                "target_channel" => "sms",
                "sms_from" => self::WORK_PHONE,
                "contents" => ["en"=> Connection::TYPE_TEXTS[Connection::TYPE_FOLLOW]],
            ]
        ],
        Connection::TYPE_FOLLOWING => [
            self::ONESIGNAL_DEVICE_EMAIL => [
                "template_id" => "e10db6a7-ab68-4cae-9abe-9d34f25409b8",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_FOLLOWING],
                "target_channel" => "email",
                "email_subject" => Connection::TYPE_TEXTS[Connection::TYPE_FOLLOWING],
            ],
            self::ONESIGNAL_DEVICE_SMS => [
                "template_id" => "8cd7b271-2505-4f7d-9855-eca0f36fe058",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_FOLLOWING],
                "target_channel" => "sms",
                "sms_from" => self::WORK_PHONE,
                "contents" => ["en"=> Connection::TYPE_TEXTS[Connection::TYPE_FOLLOWING]],
            ]
        ],
        Connection::TYPE_LIKE => [
            self::ONESIGNAL_DEVICE_EMAIL => [
                "template_id" => "d051bb39-2082-41da-b368-8d7b07d522ee",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_LIKE],
                "target_channel" => "email",
                "email_subject" => Connection::TYPE_TEXTS[Connection::TYPE_LIKE],
            ],
            self::ONESIGNAL_DEVICE_SMS => [
                "template_id" => "ea7035f5-c082-47ed-b6bd-2257a3031f11",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_LIKE],
                "target_channel" => "sms",
                "sms_from" => self::WORK_PHONE,
                "contents" => ["en"=> Connection::TYPE_TEXTS[Connection::TYPE_LIKE]],
            ]
        ],
        Connection::TYPE_CHAT => [
            self::ONESIGNAL_DEVICE_EMAIL => [
                "template_id" => "4dfb26ba-4405-48f4-8ce5-b48f87c3e660",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_CHAT],
                "target_channel" => "email",
                "email_subject" => Connection::TYPE_TEXTS[Connection::TYPE_CHAT],
            ],
            self::ONESIGNAL_DEVICE_SMS => [
                "template_id" => "460a2693-389f-4a3c-81e3-2b6d923a011b",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_CHAT],
                "target_channel" => "sms",
                "sms_from" => self::WORK_PHONE,
                "contents" => ["en"=> Connection::TYPE_TEXTS[Connection::TYPE_CHAT]],
            ]
        ],
        Connection::TYPE_CHECKIN => [
            self::ONESIGNAL_DEVICE_EMAIL => [
                "template_id" => "4dfb26ba-4405-48f4-8ce5-b48f87c3e660",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_CHECKIN],
                "target_channel" => "email",
                "email_subject" => Connection::TYPE_TEXTS[Connection::TYPE_CHECKIN],
            ],
            self::ONESIGNAL_DEVICE_SMS => [
                "template_id" => "460a2693-389f-4a3c-81e3-2b6d923a011b",
                "name" => Connection::TYPE_TEXTS[Connection::TYPE_CHECKIN],
                "target_channel" => "sms",
                "sms_from" => self::WORK_PHONE,
                "contents" => ["en"=> Connection::TYPE_TEXTS[Connection::TYPE_CHECKIN]],
            ]
        ],
    ];
}