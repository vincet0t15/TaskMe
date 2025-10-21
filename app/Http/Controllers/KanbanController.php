<?php

namespace App\Http\Controllers;

use App\Models\ListTask;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KanbanController extends Controller
{
    public function show(ListTask $list)
    {
        $tasks = Status::with([
            'tasks' => function ($query) use ($list) {
                $query->where('list_task_id', $list->id)
                    ->with(['priority', 'status', 'users', 'subTasks']);
            }
        ])
            ->whereHas('tasks', function ($query) use ($list) {
                $query->where('list_task_id', $list->id);
            })
            ->get();

        return Inertia::render('List/Kanban', [
            'list' => $list,
            'tasks' => $tasks
        ]);
    }
}
