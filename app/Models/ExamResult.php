<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamResult extends Model
{
    protected $fillable = [
        'student_id',
        'subject_id',
        'marks',
        'exam_date'
    ];
}
