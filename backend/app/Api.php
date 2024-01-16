<?php

namespace App;

interface Api
{
    public const VERSION = 1;
    public const SECRET = 'xUqbJHOoIXoyPTStGdFjjpJTSMDdff4Q';

    public const ERROR_MESSAGE = 'Internal API error';
    public const ERROR_STATUS = 422;
    public const ERROR_MESSAGE_DEPENDENCY = 'Internal API error';
    public const ERROR_STATUS_DEPENDENCY = 424;

    /**
     * RESPONSE STATUSES
     */
    public const STATUS_SUCCESS = 'success';
    public const STATUS_VERIFIED = 'verified';
    public const STATUS_FAIL = 'fail';
    public const STATUS_EXCEPTION = 'exception';

    public const STATUS_AUTH_FAILED = 'auth.failed';
    public const STATUS_VERIFICATION_SENT = 'verification.link.sent';
    public const STATUS_SIGNED = 'user.signed';
    public const STATUS_UNSIGNED = 'user.unsigned';
    public const STATUS_DELETED = 'user.deleted';

    /**
     * CLOUDFLARE IMAGES
     */
    public const CLOUDFLARE_ACCOUNT_ID = "7949104b24f3eb4c1eccadcf59893698";
    public const CLOUDFLARE_API_URL = "https://api.cloudflare.com/client/v4/accounts/" . self::CLOUDFLARE_ACCOUNT_ID . "/images";
    public const CLOUDFLARE_API_TOKEN = "QuKhxmKbZEvVFZGI-yOACWq01ITirH7t4tQRlHw0";

}