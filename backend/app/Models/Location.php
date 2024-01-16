<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'place',
        'level'
    ];

    const LOCATION_LEVELS = [
        'level0' => 0,
        'level1' => 1,
        'level2' => 2,
        'level3' => 3
    ];

    protected $casts = [
        'place' => 'object',
    ];

    protected $table = 'locations';

    public function users() {
        return $this->belongsToMany(User::class, 'users_2_locations', 'location_id', 'user_id');
    }

}
