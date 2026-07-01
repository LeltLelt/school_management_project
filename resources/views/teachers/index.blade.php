<h1>Teachers List</h1>

<a href="{{ route('teachers.create') }}">Add Teacher</a>

<table border="1" cellpadding="10">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
    </tr>

    @foreach($teachers as $teacher)
    <tr>
        <td>{{ $teacher->id }}</td>
        <td>{{ $teacher->name }}</td>
        <td>{{ $teacher->email }}</td>
        <td>{{ $teacher->phone }}</td>
        <td>
            <a href="{{ route('teachers.edit', $teacher->id) }}">Edit</a>

            <form method="POST" action="{{ route('teachers.destroy', $teacher->id) }}" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit">Delete</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>