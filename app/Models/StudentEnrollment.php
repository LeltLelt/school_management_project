<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentEnrollment extends Model
{
    protected $fillable = [
       'student_id',
       'class_id'
    ];
     public function student()
     {
        return $this->belongsTo(Student::class);
     }
     public function class()
     {
        return $this->belongsTo(Classes::class);
     }
}
