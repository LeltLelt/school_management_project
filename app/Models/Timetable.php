<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    protected $fillable=[
        'class_id',
        'teacher_id',
        'subject_id',
        'date',
        'status'
    ];
}
