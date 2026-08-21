<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimetableGroup extends Model
{
    protected $fillable = [
        'class_id',
        'name',
        'status',
        'organization_id',
    ];

    public function class()
    {
        return $this->belongsTo(
            SchoolClass::class,
            'class_id'
        );
    }

    public function timetables()
    {
        return $this->hasMany(
            Timetable::class,
            'timetable_group_id'
        );
    }
}