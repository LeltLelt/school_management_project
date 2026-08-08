<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index()
    {
        $classes = Classes::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json($classes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'teacher_id' => 'required',
        ]);

        $class = Classes::create([
            'name' => $request->name,
            'teacher_id' => $request->teacher_id,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Class created',
            'data' => $class
        ]);
    }

    public function show($id)
    {
        $class = Classes::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($class);
    }

    public function update(Request $request, $id)
    {
        $class = Classes::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'name' => 'required',
            'teacher_id' => 'required',
        ]);

        $class->update([
            'name' => $request->name,
            'teacher_id' => $request->teacher_id,
        ]);

        return response()->json([
            'message' => 'Class updated',
            'data' => $class
        ]);
    }

    public function destroy($id)
    {
        $class = Classes::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $class->delete();

        return response()->json([
            'message' => 'Class deleted'
        ]);
    }
}