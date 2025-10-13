<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Space extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function list()
    {
        return $this->hasMany(ListTask::class);
    }

    protected static function booted()
    {
        static::creating(function ($project) {
            if (Auth::check()) {
                $project->user_id = Auth::user()->id;
            }
        });
    }
}
