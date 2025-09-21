<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    protected $table = 'sectors';

    protected $fillable = ['sector_name'];

    public function contracts()
    {
        return $this->hasMany(Contract::class, 'sector_id');
    }
}
