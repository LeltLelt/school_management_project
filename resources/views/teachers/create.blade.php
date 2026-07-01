<h1>Add Teacher</h1>

<form method="POST" action="{{ route('teachers.store') }}">
    @csrf

    <input type="text" name="name" placeholder="Name"><br><br>
    <input type="text" name="email" placeholder="Email"><br><br>
    <input type="text" name="phone" placeholder="Phone"><br><br>

    <button type="submit">Save</button>
</form>