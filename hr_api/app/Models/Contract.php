<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $table = 'contracts';

    protected $fillable = [
        'user_id',
        'sector_id',
        'start_date',
        'end_date',
        'type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sector()
    {
        return $this->belongsTo(Sector::class, 'sector_id');
    }

    public function contractItems()
    {
        return $this->hasMany(ContractItem::class, 'contract_id');
    }
}
