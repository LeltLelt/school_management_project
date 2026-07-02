<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return response()->json(Teacher::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'nullable',
            
        ]);

        $teacher = Teacher::create($request->all());

        return response()->json($teacher);
    }

    public function show($id)
    {
        return response()->json(Teacher::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->update($request->all());

        return response()->json($teacher);
    }

    public function destroy($id)
    {
        Teacher::findOrFail($id)->delete();

        return response()->json(['message' => 'Teacher deleted']);
    }
}