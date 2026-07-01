<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index()
    {
        return response()->json(Classes::all());
    }

    public function store(Request $request)
    {
        $class = Classes::create($request->all());
        return response()->json($class);
    }

    public function show($id)
    {
        return response()->json(Classes::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        $class->update($request->all());

        return response()->json($class);
    }

    public function destroy($id)
    {
        Classes::findOrFail($id)->delete();

        return response()->json(['message' => 'Class deleted']);
    }
}