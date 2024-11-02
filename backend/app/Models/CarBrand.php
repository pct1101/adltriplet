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
        'brand_name',        // Tên thương hiệu
        'brand_description', // Mô tả thương hiệu
    ];

    // Thiết lập mối quan hệ với bảng car
    public function cars()
    {
        return $this->hasMany(Car::class, 'brandid'); // Mối quan hệ 1-n giữa thương hiệu và xe
    }
}