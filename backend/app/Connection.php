<?php

namespace App;

interface Connection
{
    public const TYPE_BLOCKED = 0;
    public const TYPE_FOLLOW = 1;
    public const TYPE_FOLLOWING = 2;
    public const TYPE_LIKE = 4;
    public const TYPE_CHAT = 8;
    public const TYPE_MESSAGE_READ = 16;
    public const TYPE_FAVORITE = 32;
    public const TYPE_CHECKIN = 64;
    public const TYPE_APPROVED = 128;
    public const TYPE_ALLOW = 256;

    public const TYPES_ALL = [
        self::TYPE_BLOCKED,
        self::TYPE_FOLLOW,
        self::TYPE_FOLLOWING,
        self::TYPE_LIKE,
        self::TYPE_CHAT,
        self::TYPE_MESSAGE_READ,
        self::TYPE_FAVORITE,
        self::TYPE_CHECKIN,
        self::TYPE_APPROVED,
        self::TYPE_ALLOW,
    ];

    public const TYPES_WITH_PARTNER = [
        self::TYPE_BLOCKED,
        self::TYPE_FOLLOW,
        self::TYPE_FOLLOWING,
        self::TYPE_LIKE,
        self::TYPE_CHAT,
        self::TYPE_CHECKIN,
        self::TYPE_APPROVED,
        self::TYPE_ALLOW,
    ];

    public const TYPES_UPGRADABLE = [
        self::TYPE_FOLLOW,
        self::TYPE_CHECKIN,
    ];

    public const TYPES_UPDATABLE = [
        self::TYPE_MESSAGE_READ,
    ];

    public const TYPES_WITH_MESSAGE = [
        self::TYPE_BLOCKED,
        self::TYPE_FOLLOW,
        self::TYPE_CHAT,
    ];

    public const TYPES_DOUBLESIDE = [
        self::TYPE_FOLLOW,
        self::TYPE_FOLLOWING,
        self::TYPE_CHAT,
        self::TYPE_APPROVED,
        self::TYPE_ALLOW,
    ];

    public const TYPE_TITLES = [
        self::TYPE_BLOCKED => 'blocked',
        self::TYPE_FOLLOW => 'invited',
        self::TYPE_FOLLOWING => 'connected',
        self::TYPE_LIKE => 'like',
        self::TYPE_CHAT => 'message',
        self::TYPE_MESSAGE_READ => 'message_read',
        self::TYPE_FAVORITE => 'favorite',
        self::TYPE_CHECKIN => 'checkin',
        self::TYPE_APPROVED => 'approved',
        self::TYPE_ALLOW => 'allow',
    ];

    public const TYPE_TITLES_UPGRADABLE = [
        self::TYPE_FOLLOW => [
            self::TYPE_FOLLOW => self::TYPE_TITLES[self::TYPE_FOLLOW],
            self::TYPE_FOLLOWING => self::TYPE_TITLES[self::TYPE_FOLLOWING],
        ],
        self::TYPE_CHECKIN => [
            self::TYPE_CHECKIN => self::TYPE_TITLES[self::TYPE_CHECKIN],
            self::TYPE_APPROVED => self::TYPE_TITLES[self::TYPE_APPROVED],
        ],
    ];

    public const TYPE_TEXTS = [
        self::TYPE_BLOCKED => "Another Wiggle user has blocked you from connect them",
        self::TYPE_FOLLOW => "Another user want to follow you",
        self::TYPE_FOLLOWING => "User accept your following",
        self::TYPE_LIKE => "User liked your profile",
        self::TYPE_CHAT => "User created chat with you",
        self::TYPE_MESSAGE_READ => 'message_read',
        self::TYPE_FAVORITE => 'favorite',
        self::TYPE_CHECKIN => 'checkin',
        self::TYPE_APPROVED => 'approved',
        self::TYPE_ALLOW => 'allow',
    ];
}