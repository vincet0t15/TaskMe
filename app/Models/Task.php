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
}
