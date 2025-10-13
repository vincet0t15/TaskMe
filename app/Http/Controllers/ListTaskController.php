<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskListRequest\TaskListStoreRequest;
use App\Models\ListTask;
use Illuminate\Http\Request;

class ListTaskController extends Controller
{
    public function store(TaskListStoreRequest $request)
    {
        ListTask::create([
            'name' => $request->name,
            'space_id' => $request->space_id,
        ]);

        return redirect()->back()->withSuccess('List create successfully');
    }
}
