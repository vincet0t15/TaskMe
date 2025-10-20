<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest\TaskStoreRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(TaskStoreRequest $request)
    {

        $task =  Task::create([
            'list_task_id' => $request->list_task_id,
            'name' => $request->name,
            'description' => $request->description,
            'status_id' => $request->status_id,
            'priority_id' => $request->priority_id,
            'due_date' => $request->due_date,
        ]);

        if ($request->has('assignees') && is_array($request->assignees)) {
            foreach ($request->assignees as $userId) {
                $task->assignees()->create([
                    'user_id' => $userId,
                ]);
            }
        }

        return back()->withSuccess('Task created successfully');
    }
}
