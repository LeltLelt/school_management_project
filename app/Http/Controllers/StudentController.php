<?php

namespace App\Http\Controllers;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students=Student::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();
        return response()->json($students);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'nullable',
        ]);

        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message'=>'Student created',
            'data'=>$student
        ]);
    }

    public function show($id)
    {
       $student = Student::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);
        return response()->json($student);
    }

    public function update(Request $request, $id)
    {
        $student = Student::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'nullable',
        ]);


        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        return response()->json([
            'message'=>'Student updated',
            'data'=>$student
        ]);
    }

    public function destroy($id)
    { 
        $student = Student::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);
        $student->delete();

        return response()->json([
            'message'=>'Student deleted'
        ]);
    }
}