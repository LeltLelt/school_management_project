<?php

namespace App\Http\Controllers;

use App\Models\StudentEnrollment;
use Illuminate\Http\Request;

class StudentEnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = StudentEnrollment::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json($enrollments);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
        ]);

        $enrollment = StudentEnrollment::create([
            'student_id' => $request->student_id,
            'class_id' => $request->class_id,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Student enrolled',
            'data' => $enrollment
        ]);
    }

    public function show($id)
    {
        $enrollment = StudentEnrollment::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($enrollment);
    }

    public function update(Request $request, $id)
    {
        $enrollment = StudentEnrollment::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'student_id' => 'required',
            'class_id' => 'required',
        ]);

        $enrollment->update([
            'student_id' => $request->student_id,
            'class_id' => $request->class_id,
        ]);

        return response()->json([
            'message' => 'Enrollment updated',
            'data' => $enrollment
        ]);
    }

    public function destroy($id)
    {
        $enrollment = StudentEnrollment::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $enrollment->delete();

        return response()->json([
            'message' => 'Enrollment deleted'
        ]);
    }
}