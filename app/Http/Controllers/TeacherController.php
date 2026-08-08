<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers=Teacher::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json(Teacher::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'nullable',
            
        ]);

        $teacher = Teacher::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'organization_id'=>auth()->user()->organizatiion_id,
        ]);

        return response()->json([
            'message'=>'Teacher created',
            'data'=>$teacher
        ]);
    }

    public function show($id)
    {
        $teacher=Teacher::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);
        return response()->json($teacher);
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);
        $request->validate([
            'name'=>'required',
            'email'=>'nullable|email',
            'phone'=>'nullable',
        ]);
        $teacher->update([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
        ]);

        return response()->json([
            'message'=>'Teacher updated',
            'data'=>$teacher
        ]);
    }

    public function destroy($id)
    {
        $teacher=Teacher::where(
            'organization_id',
            auth()->user()->organization_id)->findOrFail($id);
        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted']);
    }
}