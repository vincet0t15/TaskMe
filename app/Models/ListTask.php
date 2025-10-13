<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ListTask extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'space_id'
    ];
}
