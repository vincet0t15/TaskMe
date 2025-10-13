<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SpaceController;
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
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
