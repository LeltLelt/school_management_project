<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        return response()->json(Subject::all());
    }

    public function store(Request $request)
    {
         $request->validate([
            'name'=>'required',
        ]);
        $subject = Subject::create($request->all());
        return response()->json($subject);
    }

    public function show($id)
    {
        return response()->json(Subject::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $subject->update($request->all());

        return response()->json($subject);
    }

    public function destroy($id)
    {
        Subject::findOrFail($id)->delete();

        return response()->json(['message' => 'Subject deleted']);
    }
}