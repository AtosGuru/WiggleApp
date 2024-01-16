<?php

namespace App\Models;

use App\Models\Submission\Counters;
use App\Notifications;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Class User
 *
 * This class is used to represent a user in the system.
 *
 * @implements \Illuminate\Contracts\Database\Query\Builder
 * @implements \Illuminate\Database\Eloquent\Model
 * @property string $id
 * @property object $profile
 * @property string $social_id
 * @property string $phone
 * @method static where(array $param)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public const DEFAULT_PHOTO = 'https://imagedelivery.net/wXG-Ds-607bgN2v8An8cmw/60f2539e-093f-482a-d550-5542cdbf0700/Profile';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'social_id',
        'name',
        'email',
        'phone',
        'password',
        'profile',
        'refresh_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'refresh_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'profile' => 'object',
    ];

    protected $with = [
        'read',
        'follow_count'
    ];

    public function toArray()
    {
        if ($this->id !== auth()->user()->id) {
            $this->hidden = [...$this->hidden, 'email', 'phone'];
        }
        return parent::toArray();
    }

    public function read(): hasMany
    {
        return $this->hasMany(Counters::class)->select(['user_id','connection_id','read','unread']);
    }

    public function follow_count(): hasOne
    {
        return $this->hasOne(Counters::class)->select(['user_id', 'follows', 'followers']);
    }

    public function connections(): HasMany
    {
        return $this->hasMany(Connection::class);
    }

    protected function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class);
    }

    public function locations() {
        return $this->belongsToMany(Location::class, 'users_2_locations', 'user_id', 'location_id');
    }

   /**
     * Select the communication channel for the user.
     *
     * @param int|null $chanel The communication channel to detect.
     *
     * @return int The detected communication channel.
     */
    public function getNotifyChanel(int|null $chanel = null): int
    {
        return match (true) {
            !is_null($chanel), $this->social_id && in_array($chanel, [Notifications::ONESIGNAL_DEVICE_IOS, Notifications::ONESIGNAL_DEVICE_ANDROID], true) => $chanel,
            $this->phone && is_null($chanel) => Notifications::ONESIGNAL_DEVICE_SMS,
            default => Notifications::ONESIGNAL_DEVICE_EMAIL,
        };
    }
}