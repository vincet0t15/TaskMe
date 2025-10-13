<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpaceRequest\SpaceStoreRequest;
use App\Http\Requests\SpaceRequest\SpaceUpdateRequest;
use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SpaceController extends Controller
{
    public function index(Request $request)
    {
        $spaces = Space::query()
            ->where('user_id', Auth::id())
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(25)
            ->withQueryString();

        return Inertia::render('Space/index', [
            'spaces' => $spaces,
            'filters' => $request->only('search')
        ]);
    }

    public function store(SpaceStoreRequest $request)
    {

        Space::create([
            'name' => $request->name
        ]);


        return redirect()->back()->withSuccess('Space created successfully');
    }

    public function update(SpaceUpdateRequest $request, Space $space)
    {

        $space->update(['name' =>  $request->name]);

        return redirect()->back()->withSuccess('Space updated successfully');
    }

    public function destroy(Space $space)
    {
        $space->delete();

        return redirect()->back()->withSuccess('Space deleted successfully');
    }
}
