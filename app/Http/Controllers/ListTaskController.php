<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskListRequest\TaskListStoreRequest;
use App\Http\Requests\TaskListRequest\TaskListUpdateRequest;
use App\Models\ListTask;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListTaskController extends Controller
{
    public function store(TaskListStoreRequest $request)
    {
        ListTask::create([
            'name' => $request->name,
            'space_id' => $request->space_id,
            'priority_id' => $request->priority_id
        ]);

        return redirect()->back()->withSuccess('List create successfully');
    }

    public function update(TaskListUpdateRequest $request, ListTask $list)
    {
        $list->update(['name' => $request->name]);

        return redirect()->back()->withSuccess('List updated successfully');
    }

    public function destroy(ListTask $list)
    {
        $list->delete();

        return redirect()->back()->withSuccess('List deleted successfully');
    }

    public function show(ListTask $list)
    {
        return Inertia::render('List/show');
    }
}
