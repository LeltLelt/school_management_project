<?php

namespace App\Http\Controllers;

use App\Models\StudentEnrollment;
use Illuminate\Http\Request;

class StudentEnrollmentController extends Controller
{
    public function index()
    {
        return response()->json(
            StudentEnrollment::with(['student', 'class'])->get()
        );
    }
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
        ]);

        $enrollment = StudentEnrollment::create($request->all());

        return response()->json([
            'message' => 'Enrollment created successfully',
            'data' => $enrollment
        ]);
    }
    public function show($id)
    {
        $enrollment = StudentEnrollment::with(['student', 'class'])
            ->findOrFail($id);

        return response()->json($enrollment);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
        ]);

        $enrollment = StudentEnrollment::findOrFail($id);

        $enrollment->update($request->all());

        return response()->json([
            'message' => 'Enrollment updated successfully',
            'data' => $enrollment
        ]);
    }
    public function destroy($id)
    {
        StudentEnrollment::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Enrollment deleted successfully'
        ]);
    }
}
