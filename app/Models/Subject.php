<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Organization;

class Subject extends Model
{
    protected $fillable = [
        'name',
        'organization_id',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
}