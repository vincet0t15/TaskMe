<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListTask extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'space_id',
        'priority_id'
    ];

    public function priorities()
    {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'list_task_id', 'id');
    }
}
