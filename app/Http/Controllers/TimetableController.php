<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    public function index(Request $request)
    {
        $query = Timetable::query();

        // Organization isolation
        $query->where(
            'organization_id',
            auth()->user()->organization_id
        );

        // Class isolation
        if ($request->filled('class_id')) {
            $query->where(
                'class_id',
                $request->class_id
            );
        }

        // Timetable isolation
        if ($request->filled('timetable_group_id')) {
            $query->where(
                'timetable_group_id',
                $request->timetable_group_id
            );
        }

        return response()->json(
            $query->orderBy('date')
                  ->orderBy('start_time')
                  ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required',
            'teacher_id' => 'required',
            'subject_id' => 'required',
            'timetable_group_id' => 'required',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);


        $groupExists = \App\Models\TimetableGroup::where(
            'id',
            $request->timetable_group_id
        )
        ->where(
            'class_id',
            $request->class_id
        )
        ->where(
            'organization_id',
            auth()->user()->organization_id
        )
        ->exists();

        if (!$groupExists) {
            return response()->json([
                'message' =>
                    'Selected timetable does not belong to this class.'
            ], 422);
        }

        $timetable = Timetable::create([
            'class_id' => $request->class_id,
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'timetable_group_id' =>
                $request->timetable_group_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'organization_id' =>
                auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Timetable created',
            'data' => $timetable
        ], 201);
    }

    public function show($id)
    {
        $timetable = Timetable::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($timetable);
    }

    public function update(Request $request, $id)
    {
        $timetable = Timetable::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'class_id' => 'required',
            'teacher_id' => 'required',
            'subject_id' => 'required',
            'timetable_group_id' => 'required',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);


        $groupExists = \App\Models\TimetableGroup::where(
            'id',
            $request->timetable_group_id
        )
        ->where(
            'class_id',
            $request->class_id
        )
        ->where(
            'organization_id',
            auth()->user()->organization_id
        )
        ->exists();

        if (!$groupExists) {
            return response()->json([
                'message' =>
                    'Selected timetable does not belong to this class.'
            ], 422);
        }

        $timetable->update([
            'class_id' => $request->class_id,
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'timetable_group_id' =>
                $request->timetable_group_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return response()->json([
            'message' => 'Timetable updated',
            'data' => $timetable
        ]);
    }

    public function destroy($id)
    {
        $timetable = Timetable::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $timetable->delete();

        return response()->json([
            'message' => 'Timetable deleted'
        ]);
    }
}
