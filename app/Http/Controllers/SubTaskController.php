<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubTaskRequest\SubTaskStoreRequest;
use App\Models\SubTask;
use Illuminate\Http\Request;

class SubTaskController extends Controller
{
    public function store(SubTaskStoreRequest $request)
    {
        $subTask = SubTask::create([
            'name' => $request->name,
            'task_id' => $request->task_id,
            'description' => $request->description,
            'status_id' => $request->status_id,
            'priority_id' => $request->priority_id,
            'due_date' => $request->due_date,
        ]);

        if ($request->has('assignees') && is_array($request->assignees)) {
            foreach ($request->assignees as $userId) {
                $subTask->assignees()->create([
                    'user_id' => $userId,
                ]);
            }
        }

        return back()->withSuccess('Subtask created successfully');
    }

    public function update(Request $request, SubTask $subTask)
    {
        $subTask->update([
            'name' => $request->name,
            'task_id' => $request->task_id,
            'description' => $request->description,
            'status_id' => $request->status_id,
            'priority_id' => $request->priority_id,
            'due_date' => $request->due_date,
        ]);

        // Update assignees
        if ($request->has('assignees') && is_array($request->assignees)) {
            // Delete existing assignees
            $subTask->assignees()->delete();

            // Add new assignees
            foreach ($request->assignees as $userId) {
                $subTask->assignees()->create([
                    'user_id' => $userId,
                ]);
            }
        } elseif ($request->has('assignees')) {
            // If assignees is present but empty array, remove all
            $subTask->assignees()->delete();
        }

        return redirect()->back()->with('success', 'Subtask updated successfully.');
    }
}
