<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Student;

class Organization extends Model
{
     public function users()
    {
        return $this->hasMany(User::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
    public function teachers()
{
    return $this->hasMany(Teacher::class);
}

public function classes()
{
    return $this->hasMany(SchoolClass::class);
}

public function subjects()
{
    return $this->hasMany(Subject::class);
}

public function timetables()
{
    return $this->hasMany(Timetable::class);
}

public function attendances()
{
    return $this->hasMany(Attendance::class);
}

public function studentMarks()
{
    return $this->hasMany(StudentMark::class);
}

public function studentEnrollments()
{
    return $this->hasMany(StudentEnrollment::class);
}
}
