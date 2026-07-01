<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    public function index()
    {
        return response()->json(Timetable::all());
    }

    public function store(Request $request)
    {
        $timetable = Timetable::create($request->all());
        return response()->json($timetable);
    }

    public function show($id)
    {
        return response()->json(Timetable::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $timetable = Timetable::findOrFail($id);
        $timetable->update($request->all());

        return response()->json($timetable);
    }

    public function destroy($id)
    {
        Timetable::findOrFail($id)->delete();

        return response()->json(['message' => 'Timetable deleted']);
    }
}
