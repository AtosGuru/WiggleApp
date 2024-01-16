<?php
namespace App\Models\Submission;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reads extends Model
{
    use HasFactory;

    protected $fillable = [];

    protected $casts = [];

    protected $hidden = [];

    protected $with = [];
}
