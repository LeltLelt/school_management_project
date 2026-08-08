<?php

namespace App\Http\Controllers;

use App\Models\ExamResult;
use Illuminate\Http\Request;

class ExamResultController extends Controller
{
    public function index()
    {
        $marks = ExamResult::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json($marks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'subject_id' => 'required',
            'marks' => 'required|integer',
        ]);

        $mark = ExamResult::create([
            'student_id' => $request->student_id,
            'subject_id' => $request->subject_id,
            'marks' => $request->marks,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Student mark created',
            'data' => $mark
        ]);
    }

    public function show($id)
    {
        $mark = ExamResult::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($mark);
    }

    public function update(Request $request, $id)
    {
        $mark = ExamResult::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'student_id' => 'required',
            'subject_id' => 'required',
            'marks' => 'required|integer',
        ]);

        $mark->update([
            'student_id' => $request->student_id,
            'subject_id' => $request->subject_id,
            'marks' => $request->marks,
        ]);

        return response()->json([
            'message' => 'Student mark updated',
            'data' => $mark
        ]);
    }

    public function destroy($id)
    {
        $mark = ExamResult::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $mark->delete();

        return response()->json([
            'message' => 'Student mark deleted'
        ]);
    }
}