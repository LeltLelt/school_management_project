<h1>Edit Teacher</h1>

<form method="POST" action="{{ route('teachers.update', $teacher->id) }}">
    @csrf
    @method('PUT')

    <input type="text" name="name" value="{{ $teacher->name }}"><br><br>
    <input type="text" name="email" value="{{ $teacher->email }}"><br><br>
    <input type="text" name="phone" value="{{ $teacher->phone }}"><br><br>

    <button type="submit">Update</button>
</form>