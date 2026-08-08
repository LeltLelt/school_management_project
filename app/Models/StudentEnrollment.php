<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;
use App\Models\Student;
use App\Models\Class;

class StudentEnrollment extends Model
{
    protected $fillable = [
       'student_id',
       'class_id',
       'organization_id'
    ];
     public function student()
     {
        return $this->belongsTo(Student::class);
     }
     public function class()
     {
        return $this->belongsTo(Classes::class);
     }
      public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
