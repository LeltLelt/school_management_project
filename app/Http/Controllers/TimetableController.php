<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use App\Models\Classes;
use App\Models\Teacher;
use App\Models\Subject;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    public function index()
    {
        $timetables = Timetable::all();
        return view('timetables.index', compact('timetables'));
    }

    public function create()
    {
        $classes = Classes::all();
        $teachers = Teacher::all();
        $subjects = Subject::all();

        return view('timetables.create', compact('classes','teachers','subjects'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'class_id' => 'required',
            'teacher_id' => 'required',
            'subject_id' => 'required',
            'date' => 'required'
        ]);

        Timetable::create($request->all());

        return redirect()->route('timetables.index');
    }

    public function edit($id)
    {
        $timetable = Timetable::findOrFail($id);

        $classes = Classes::all();
        $teachers = Teacher::all();
        $subjects = Subject::all();

        return view('timetables.edit', compact('timetable','classes','teachers','subjects'));
    }

    public function update(Request $request, $id)
    {
        $timetable = Timetable::findOrFail($id);
        $timetable->update($request->all());

        return redirect()->route('timetables.index');
    }

    public function destroy($id)
    {
        Timetable::findOrFail($id)->delete();

        return redirect()->route('timetables.index');
    }
}
