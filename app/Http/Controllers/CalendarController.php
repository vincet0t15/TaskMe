<?php

namespace App\Http\Controllers;

use App\Models\ListTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function show(ListTask $list)
    {
        $lists = $list->with('tasks')->first();
        $tasks = Task::with(['users', 'priority', 'status'])
            ->where('list_task_id', $list->id)
            ->get();

        return Inertia::render('List/Calendar', [
            'list' => $lists,
            'tasks' => $tasks,
        ]);
    }

    public function moveData(Request $request, Task $task)
    {

        $task->update(['due_date' => $request->due_date]);

        return redirect()->back()->withSuccess('Task updated successfully');
    }
}
