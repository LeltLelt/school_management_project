<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $fillable = [
        'name',
        'teacher_id',
        'status'
    ];
    public function enrollments()
    {
        return $this->hasMany(StudentEnrollment::class);
    }
}
