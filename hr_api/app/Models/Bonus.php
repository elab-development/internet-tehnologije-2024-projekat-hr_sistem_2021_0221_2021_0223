<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bonus extends Model
{
    protected $table = 'bonuses';

    protected $fillable = ['user_id', 'amount', 'date_awarded', 'note'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
