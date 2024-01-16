<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Event extends Model
{
    use HasFactory;
    public const SCHEDULE = '{
    "opening_hours":{
        "open_now": false,
        "periods": [
            { "open": {"day": 0, "time": "0000"}, "close": {"day": 0, "time": "2359"} },
            { "open": {"day": 1, "time": "0000"}, "close": {"day": 1, "time": "2359"} },
            { "open": {"day": 2, "time": "0000"}, "close": {"day": 2, "time": "2359"} },
            { "open": {"day": 3, "time": "0000"}, "close": {"day": 3, "time": "2359"} },
            { "open": {"day": 4, "time": "0000"}, "close": {"day": 4, "time": "2359"} },
            { "open": {"day": 5, "time": "0000"}, "close": {"day": 5, "time": "2359"} },
            { "open": {"day": 6, "time": "0000"}, "close": {"day": 6, "time": "2359"} }
        ],
        "weekday_text": "All days, all hours",
        "special_days": [
            {"date": "2023-12-31"}
        ]
    },
    "secondary_opening_hours":{
        "open_now": false,
        "periods": [
            { "open": {"day": 0, "time": "0000"}, "close": {"day": 0, "time": "2359"} },
            { "open": {"day": 1, "time": "0000"}, "close": {"day": 1, "time": "2359"} },
            { "open": {"day": 2, "time": "0000"}, "close": {"day": 2, "time": "2359"} },
            { "open": {"day": 3, "time": "0000"}, "close": {"day": 3, "time": "2359"} },
            { "open": {"day": 4, "time": "0000"}, "close": {"day": 4, "time": "2359"} },
            { "open": {"day": 5, "time": "0000"}, "close": {"day": 5, "time": "2359"} },
            { "open": {"day": 6, "time": "0000"}, "close": {"day": 6, "time": "2359"} }
        ],
        "weekday_text": "All days, all hours",
        "special_days": [
            {"date": "2023-12-31"}
        ]
    }
}';

    protected $fillable = [
        'id',
        'title',
        'location_id',
        'description',
        'schedule',
        'url',
        'user_id',
    ];

    protected $casts = [
        'schedule' => 'json'
    ];

    protected function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function connection(): HasMany
    {
        return $this->hasMany(Connection::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }


    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
