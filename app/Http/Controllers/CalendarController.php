<?php

namespace App\Http\Controllers;

use App\Models\ListTask;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function show(ListTask $list)
    {
        $lists = $list->with('tasks')->first();

        return Inertia::render('List/Calendar', [
            'list' => $lists,
        ]);
    }
}
