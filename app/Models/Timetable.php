<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;
use App\Models\SchoolClass;
use App\Models\Teacher;
use App\Models\Subject;

class Timetable extends Model
{
    protected $fillable = [
        'class_id',
        'teacher_id',
        'subject_id',
        'date',
        'start_time',
        'end_time',
        'organization_id',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}

