<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContractItem extends Model
{
    protected $table = 'contract_items';

    protected $fillable = [
        'contract_id',
        'position_id',
        'yearly_salary',
        'start_date',
        'end_date'
    ];

    public function contract()
    {
        return $this->belongsTo(Contract::class, 'contract_id');
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }
}
