<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $table = 'positions';

    protected $fillable = ['position_name', 'short_name'];

    public function contractItems()
    {
        return $this->hasMany(ContractItem::class, 'position_id');
    }
}
