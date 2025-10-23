<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest\TaskStoreRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function update(Request $request, Task $task)
    {
        $task->update([
            'list_task_id' => $request->list_task_id,
            'name' => $request->name,
            'description' => $request->description,
            'status_id' => $request->status_id,
            'priority_id' => $request->priority_id,
            'due_date' => $request->due_date,
        ]);


        if ($request->has('assignees') && is_array($request->assignees)) {

            $task->assignees()->delete();

            foreach ($request->assignees as $userId) {
                $task->assignees()->create([
                    'user_id' => $userId,
                ]);
            }
        } elseif ($request->has('assignees')) {
            $task->assignees()->delete();
        }

        return back()->withSuccess('Task updated successfully');
    }

    public function show(Task $task)
    {
        return Inertia::render('Task/show', [
            'task' => $task,
        ]);
    }

    public function details(Task $task)
    {
        $taskDetails = Task::with([
            'priority',
            'status',
            'subTasks' => function ($query) {
                $query->with(['priority', 'status', 'users']);
            }
        ])
            ->withCount([
                'subTasks as completed_subtasks_count' => function ($query) {
                    $query->where('status_id', 4);
                },
                'subTasks as total_subtasks',
                'users as assignees_count'
            ])
            ->findOrFail($task->id);

        // Load users who have subtasks for this task
        $usersWithSubTasks = User::whereHas('subTasks', function ($query) use ($task) {
            $query->where('task_id', $task->id);
        })->get();

        // Add total subtask and completed subtask counts for each user
        foreach ($usersWithSubTasks as $user) {
            $userSubTasks = $user->subTasks->filter(function ($subTask) use ($task) {
                return $subTask->task_id === $task->id;
            });

            $totalSubTasks = $userSubTasks->count();
            $completedSubTasks = $userSubTasks->filter(function ($subTask) {
                return $subTask->status_id === 4; // Assuming 4 is completed status_id
            })->count();

            $user->total_subtasks = $totalSubTasks;
            $user->completed_subtasks = $completedSubTasks;
        }

        $taskDetails->userHasSubTask = $usersWithSubTasks;

        // Ensure subTasks relationship exists
        $totalSubtasks = $taskDetails->subTasks ? $taskDetails->subTasks->count() : 0;
        $completedSubtasks = $taskDetails->completed_subtasks_count;

        $progressPercentage = $totalSubtasks > 0
            ? ($completedSubtasks / $totalSubtasks) * 100
            : 0;

        $taskDetails->progress_percentage = $progressPercentage;

        return Inertia::render('Task/details', [
            'task' => $taskDetails,
        ]);
    }
}
