<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarBrand extends Model
{
    use HasFactory;

    protected $table = 'carbrand'; // Đặt tên bảng
    protected $primaryKey = 'brand_id';

    protected $fillable = [
        'brand_name', 
        'brand_logo',       
        'brand_description', 
    ];

    // Thiết lập mối quan hệ với bảng car
    public function cars()
    {
        return $this->hasMany(Car::class, 'brandid');
    }
}