<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'students';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'gender',
        'address',
        'status'
    ];
    public function enrollments()
    {
        return $this->hasMany(StudentEnrollment::class);
    }
}
