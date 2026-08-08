<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;
use App\Models\Teacher;
use App\Models\StudentEnrollment;

class Classes extends Model
{
    protected $table = 'classes';

    protected $fillable = [
        'name',
        'teacher_id',
        'organization_id',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function enrollments()
    {
        return $this->hasMany(StudentEnrollment::class, 'class_id');
    }
}