<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json($attendances);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
            'date' => 'required|date',
            'status' => 'required|boolean',
        ]);

        $attendance = Attendance::create([
            'student_id' => $request->student_id,
            'class_id' => $request->class_id,
            'date' => $request->date,
            'status' => $request->status,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Attendance created',
            'data' => $attendance
        ]);
    }

    public function show($id)
    {
        $attendance = Attendance::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($attendance);
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
            'date' => 'required|date',
            'status' => 'required|boolean',
        ]);

        $attendance->update([
            'student_id' => $request->student_id,
            'class_id' => $request->class_id,
            'date' => $request->date,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Attendance updated',
            'data' => $attendance
        ]);
    }

    public function destroy($id)
    {
        $attendance = Attendance::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $attendance->delete();

        return response()->json([
            'message' => 'Attendance deleted'
        ]);
    }
}