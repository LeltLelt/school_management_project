<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        return response()->json(Attendance::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id'=>'required',
            'date'=>'nullable|date',
        ]);
        $attendance = Attendance::create($request->all());
        return response()->json($attendance);
    }

    public function show($id)
    {
        return response()->json(Attendance::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->update($request->all());

        return response()->json($attendance);
    }

    public function destroy($id)
    {
        Attendance::findOrFail($id)->delete();

        return response()->json(['message' => 'Attendance deleted']);
    }
}