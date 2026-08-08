<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::where(
            'organization_id',
            auth()->user()->organization_id
        )->get();

        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $subject = Subject::create([
            'name' => $request->name,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return response()->json([
            'message' => 'Subject created',
            'data' => $subject
        ]);
    }

    public function show($id)
    {
        $subject = Subject::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $request->validate([
            'name' => 'required',
        ]);

        $subject->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Subject updated',
            'data' => $subject
        ]);
    }

    public function destroy($id)
    {
        $subject = Subject::where(
            'organization_id',
            auth()->user()->organization_id
        )->findOrFail($id);

        $subject->delete();

        return response()->json([
            'message' => 'Subject deleted'
        ]);
    }
}