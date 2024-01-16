<?php
namespace App\Models\Submission;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Counters extends Model implements \App\Connection
{
    use HasFactory;

    protected $fillable = [];

    protected $casts = [];

    protected $hidden = [];

    protected $with = [];
}
