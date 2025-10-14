<?php

namespace App\Providers;

use App\Http\Controllers\PriorityController;
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

                // Safely resolve the controller and call its method
                return app(PriorityController::class)->getAllPriorities();
            },
        ]);
    }
}
