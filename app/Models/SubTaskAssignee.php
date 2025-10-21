<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubTaskAssignee extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'sub_task_id'

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subTask()
    {
        return $this->belongsTo(SubTask::class, 'sub_task_id');
    }
}
