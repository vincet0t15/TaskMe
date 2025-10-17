<?php

namespace App\Providers;

use App\Http\Controllers\PriorityController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'systemPriorities' => function () {
                if (!Auth::check()) {
                    return null;
                }

                return app(PriorityController::class)->getAllPriorities();
            },
            'systemStatuses' => function () {
                if (!Auth::check()) {
                    return null;
                }

                return app(StatusController::class)->getAllStatuses();
            },
            'systemUsers' => function () {
                if (!Auth::check()) {
                    return null;
                }

                return app(UserController::class)->getAllUsers();
            }
        ]);
    }
}
