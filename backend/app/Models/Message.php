<?php

namespace App\Models;

use App\Models\Submission\Reads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @param \App\Models\Connection $connection
 */
class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'message',
        'connection_id',
        'image_id',
        'user_id',
    ];

    protected $casts = [
    ];

    protected $with = [
        'image',
        'readedAt',
    ];

    public function connection(): BelongsTo
    {
        return $this->belongsTo(Connection::class)->where('type', Connection::TYPE_CHAT);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    public function readedAt(): HasOne
    {
        return $this->hasOne(Reads::class)->where(['user_id' => auth()->user()->id])->select(['updated_at','message_id','is_read']);
    }
}
