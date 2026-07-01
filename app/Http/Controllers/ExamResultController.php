<?php

namespace App\Http\Controllers;

use App\Models\ExamResult;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;

class ExamResultController extends Controller
{
    public function index()
    {
        $results = ExamResult::all();
        return view('exam_results.index', compact('results'));
    }

    public function create()
    {
        $students = Student::all();
        $subjects = Subject::all();

        return view('exam_results.create', compact('students','subjects'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required',
            'subject_id' => 'required',
            'marks' => 'required',
            'exam_date' => 'required'
        ]);

        ExamResult::create($request->all());

        return redirect()->route('exam_results.index');
    }

    public function edit($id)
    {
        $result = ExamResult::findOrFail($id);
        $students = Student::all();
        $subjects = Subject::all();

        return view('exam_results.edit', compact('result','students','subjects'));
    }

    public function update(Request $request, $id)
    {
        $result = ExamResult::findOrFail($id);
        $result->update($request->all());

        return redirect()->route('exam_results.index');
    }

    public function destroy($id)
    {
        ExamResult::findOrFail($id)->delete();

        return redirect()->route('exam_results.index');
    }
}
