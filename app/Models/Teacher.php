<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organiztion;

class Teacher extends Model
{
    protected $table = 'teachers';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'organization_id',
        'gender',
        'address',
        'status'
    ];
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}
