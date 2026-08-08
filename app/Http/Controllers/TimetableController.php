<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    public function index()
    {
        $timetables = Timetable::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json($timetables);
    }

    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required',
            'teacher_id' => 'required',
            'subject_id' => 'required',
            'date' => 'required|date',
            'start_time'=>'required',
            'end_time'=>'required',
        ]);

        $timetable = Timetable::create([
            'class_id' => $request->class_id,
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'date' => $request->date,
            'start_time'=>$request->start_time,
            'end_time'=>$request->end_time,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Timetable created',
            'data' => $timetable
        ]);
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
            'date' => 'required|date',
            'start_time'=>'required',
            'end_time'=>'required',
        ]);

        $timetable->update([
            'class_id' => $request->class_id,
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'date' => $request->date,
            'start_time'=>$request->start_time,
            'end_time'=>$request->end_time,
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
