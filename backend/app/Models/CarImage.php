<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarImage extends Model
{
    use HasFactory;

    protected $table = 'car_image'; // Đặt tên bảng

    protected $fillable = [
        'carImage_url',          // Đường dẫn hình ảnh
        'carImage_description',  // Mô tả hình ảnh
        'car_id',                // Tham chiếu đến xe
    ];

    // Thiết lập mối quan hệ với bảng car
    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id'); // Mối quan hệ nhiều-1
    }
}
