<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notify extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'active',
        'token',
        'message',
        'user_id',
    ];

    protected $casts = [
        'message' => 'object',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'message->partner_id', 'id');
    }
}
