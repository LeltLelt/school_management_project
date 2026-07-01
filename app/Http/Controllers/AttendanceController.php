<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::all();
        return view('attendances.index', compact('attendances'));
    }

    public function create()
    {
        $students = Student::all();
        return view('attendances.create', compact('students'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'date' => 'required',
            'status' => 'required'
        ]);

        Attendance::create($request->all());

        return redirect()->route('attendances.index');
    }

    public function edit($id)
    {
        $attendance = Attendance::findOrFail($id);
        $students = Student::all();

        return view('attendances.edit', compact('attendance','students'));
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->update($request->all());

        return redirect()->route('attendances.index');
    }

    public function destroy($id)
    {
        Attendance::findOrFail($id)->delete();

        return redirect()->route('attendances.index');
    }
}
