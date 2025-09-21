<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public const BELLOW_AVERAGE = 'Bellow Average';
    public const AVERAGE = 'Average';
    public const GOOD = 'Good';
    public const EXCELLENT = 'Excellent';
    public const OUTSTANDING = 'Outstanding';


    protected $table = 'reviews';

    protected $fillable = ['user_id', 'review_date', 'score', 'comments'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
