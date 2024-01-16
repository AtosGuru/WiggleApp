<?php
namespace App\Models;

use App\Models\Submission\Reads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int   $id
 * @property User  $user
 * @property int   $user_id
 * @property User  $partner
 * @property int   $partner_id
 * @property int   $type
 */
class Connection extends Model implements \App\Connection
{
    use HasFactory;

    protected $fillable = [
        'id',
        'type',
        'user_id',
        'partner_id',
        'event_id',
        'image_id',
        'connection_id',
        'updated_at',
    ];

    protected $appends = ['unread'];

    protected $casts = [
        'partner' => User::class,
    ];

    protected $hidden = [
        'created_at',
    ];

    protected $with = [
        'messages',
        'partner',
        'event',
    ];

    public function messages(): ?HasMany
    {
        switch ($this->type) {
            case self::TYPE_MESSAGE_READ:
                return $this->hasMany(Reads::class, 'id')->orderBy('updated_at','desc');
            default:
                return $this->hasMany(Message::class)->limit(5)->orderBy('updated_at','desc');
        }
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, $this->isPartner($this->partner_id) ? 'user_id' : 'partner_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, $this->isPartner($this->user_id) ? 'partner_id' : 'user_id');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function read(): hasMany
    {
        return $this->hasMany(Reads::class, 'id', 'id');
    }

    public function getUnreadAttribute()
    {
        return [
            self::TYPE_CHAT => [
                'time' => $this->created_at,
                'count' => $this->read()->where(['is_read'=>0,'user_id'=>auth()->user()->id])->count(),
                'partnering' => $this->isPartner($this->partner_id)
            ],
        ][$this->type] ?? null;
    }

    private function isPartner($possible) {
        return $possible === auth()->user()->id;
    }

}
