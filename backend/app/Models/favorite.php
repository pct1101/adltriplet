<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class favorite extends Model
{
    use HasFactory;
    protected $table = 'favorite';
    public $primaryKey = 'favorite_id';
    protected $fillable = ['date_favorite', 'user_id', 'car_id'];
}
