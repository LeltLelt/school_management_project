<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;
use App\Models\Student;
use App\Models\Subject;

class StudentMark extends Model
{
    protected $table = 'exam_resuts';

    protected $fillable = [
        'student_id',
        'subject_id',
        'marks',
        'organization_id',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}