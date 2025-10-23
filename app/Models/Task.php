<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'list_task_id',
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

    public function list()
    {
        return $this->belongsTo(ListTask::class, 'list_task_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function assignees()
    {
        return $this->hasMany(TaskAssignee::class, 'task_id');
    }

    public function users()
    {
        return $this->hasManyThrough(User::class, TaskAssignee::class, 'task_id', 'id', 'id', 'user_id');
    }

    public function subTasks()
    {
        return $this->hasMany(SubTask::class, 'task_id');
    }

    public function usersWithSubTasks()
    {
        return $this->hasManyThrough(
            User::class,
            SubTask::class,
            'task_id',        // Foreign key on sub_tasks table
            'id',             // Foreign key on users table (used in pivot)
            'id',             // Local key on tasks table
            'id'              // Local key on sub_tasks table
        )->whereHas('subTasks', function ($query) {
            $query->whereColumn('sub_tasks.task_id', 'tasks.id');
        });
    }
}
