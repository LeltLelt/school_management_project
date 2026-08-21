<?php

namespace App\Http\Controllers;

use App\Models\TimetableGroup;
use Illuminate\Http\Request;

class TimetableGroupController extends Controller
{
    public function index(Request $request)
    {
        $query = TimetableGroup::query();

        $query->where(
            'organization_id',
            auth()->user()->organization_id
        );
        if ($request->filled('class_id')) {
            $query->where(
                'class_id',
                $request->class_id
            );
        }

        return response()->json(
            $query->where('status', 1)
                  ->orderBy('id')
                  ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        $group = TimetableGroup::create([
            'class_id' => $request->class_id,
            'name' => $request->name,
            'status' => 1,
            'organization_id' =>
                auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Timetable created',
            'data' => $group
        ], 201);
    }

    public function show($id)
    {
        $group = TimetableGroup::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($group);
    }

    public function update(
        Request $request,
        $id
    ) {
        $group = TimetableGroup::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'class_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        $group->update([
            'class_id' => $request->class_id,
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Timetable updated',
            'data' => $group
        ]);
    }

    public function destroy($id)
    {
        $group = TimetableGroup::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $group->update([
            'status' => 0
        ]);

        return response()->json([
            'message' => 'Timetable deleted'
        ]);
    }
}