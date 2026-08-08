<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;
use App\Models\StudentEnrollment;

class Student extends Model
{
    protected $table = 'students';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'organization_id',
        'gender',
        'address',
        'status'
    ];
    public function enrollments()
    {
        return $this->hasMany(StudentEnrollment::class);
    }

public function organization()
{
    return $this->belongsTo(Organization::class);
}
}
