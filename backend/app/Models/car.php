<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class car extends Model
{
    use HasFactory;
    protected $table = 'car';
    public $primaryKey = 'car_id';
    public $fillable = ['car_name', 'seats', 'model', 'license_plate', 'rental_price', 'car_status', 'mileage', 'car_description', 'brandid'];
}
