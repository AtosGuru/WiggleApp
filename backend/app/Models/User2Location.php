<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User2Location extends Model
{
    use HasFactory;

    protected $table = 'users_2_locations';

    public $timestamps = false;

    protected $fillable = ['user_id', 'location_id'];

    protected $with = ['users', 'locations'];

    public function users() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function locations() {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }

}
