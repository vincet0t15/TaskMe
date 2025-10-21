<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\ListTaskController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\SubTaskController;
use App\Http\Controllers\TaskController;
use App\Models\ListTask;
use App\Models\Space;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    // PROJECT
    Route::get('spaces', [SpaceController::class, 'index'])->name('spaces.index');
    Route::post('spaces', [SpaceController::class, 'store'])->name('spaces.store');
    Route::put('spaces/{space}', [SpaceController::class, 'update'])->name('spaces.update');
    Route::delete('spaces/{space}', [SpaceController::class, 'destroy'])->name('space.destroy');


    // LIST
    Route::post('lists', [ListTaskController::class, 'store'])->name('list.store');
    Route::put('lists/{list}', [ListTaskController::class, 'update'])->name('list.update');
    Route::delete('lists/{list}', [ListTaskController::class, 'destroy'])->name('list.destroy');
    Route::get('lists/{list}', [ListTaskController::class, 'show'])->name('lists.show');

    // TASK
    Route::post('tasks', [TaskController::class, 'store'])->name('task.store');
    Route::put('tasks/{task}', [TaskController::class, 'update'])->name('task.update');

    // Calendar
    Route::get('calendar/{list}', [CalendarController::class, 'show'])->name('calendar.show');

    // Kanban
    Route::get('spaces/kanban/{list}', [KanbanController::class, 'show'])->name('kanban.show');

    // SUBTASK
    Route::post('subtasks', [SubTaskController::class, 'store'])->name('subtask.store');
    Route::put('subtasks/{subTask}', [SubTaskController::class, 'update'])->name('subtask.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
