<?php

namespace App\Http\Controllers;

use App\Models\ExamResult;
use Illuminate\Http\Request;

class ExamResultController extends Controller
{
    public function index()
    {
        return response()->json(ExamResult::all());
    }

    public function store(Request $request)
    {
        $result = ExamResult::create($request->all());
        return response()->json($result);
    }

    public function show($id)
    {
        return response()->json(ExamResult::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $result = ExamResult::findOrFail($id);
        $result->update($request->all());

        return response()->json($result);
    }

    public function destroy($id)
    {
        ExamResult::findOrFail($id)->delete();

        return response()->json(['message' => 'Result deleted']);
    }
}
