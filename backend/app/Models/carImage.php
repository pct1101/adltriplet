<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class carImage extends Model
{
    use HasFactory;
    protected $table = 'carimage';
    public $primaryKey = 'carImage_id';

    protected $fillable = ['carImage_name', 'carImage_description', 'car_id'];
}
