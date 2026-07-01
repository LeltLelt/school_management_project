 <?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Teacher;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index()
    {
        $classes = Classes::all();
        return view('classes.index', compact('classes'));
    }

    public function create()
    {
        $teachers = Teacher::all(); // dropdown အတွက်
        return view('classes.create', compact('teachers'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'teacher_id' => 'required',
            'status' => 'nullable'
        ]);

        Classes::create($request->all());

        return redirect()->route('classes.index');
    }

    public function edit($id)
    {
        $class = Classes::findOrFail($id);
        $teachers = Teacher::all();

        return view('classes.edit', compact('class', 'teachers'));
    }

    public function update(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        $class->update($request->all());

        return redirect()->route('classes.index');
    }

    public function destroy($id)
    {
        Classes::findOrFail($id)->delete();

        return redirect()->route('classes.index');
    }
}