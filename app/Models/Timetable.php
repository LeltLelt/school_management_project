<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
        'timetable_group_id',
    ];

    public function organization()
    {
        return $this->belongsTo(
            Organization::class,
            'organization_id'
        );
    }

    public function class()
    {
        return $this->belongsTo(
            SchoolClass::class,
            'class_id'
        );
    }

    public function teacher()
    {
        return $this->belongsTo(
            Teacher::class,
            'teacher_id'
        );
    }

    public function subject()
    {
        return $this->belongsTo(
            Subject::class,
            'subject_id'
        );
    }

    public function timetableGroup()
    {
        return $this->belongsTo(
            TimetableGroup::class,
            'timetable_group_id'
        );
    }
}
