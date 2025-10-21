<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubTask extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'task_id',
        'name',
        'description',
        'status_id',
        'priority_id',
        'due_date'
    ];

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function users()
    {
        return $this->hasManyThrough(User::class, SubTaskAssignee::class, 'sub_task_id', 'id', 'id', 'user_id');
    }

    public function assignees()
    {
        return $this->hasMany(SubTaskAssignee::class, 'sub_task_id');
    }
}
