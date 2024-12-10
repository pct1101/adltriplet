<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'car'; // Đặt tên bảng
    protected $primaryKey = 'car_id'; // Định nghĩa khóa chính

    protected $fillable = [
        'car_id',
        'car_name',
        'seats',
        'transmission_type',
        'fuel_type',
        'model',
        'license_plate',
        'rental_price',
        'car_status',
        'mileage',
        'car_image',
        'car_description',
        'brandid', // Tham chiếu đến thương hiệu
    ];

    // Thiết lập mối quan hệ với bảng carbrand
    public function brand()
    {
        return $this->belongsTo(CarBrand::class, 'brandid'); // Mối quan hệ nhiều-1
    }

    // Thiết lập mối quan hệ với bảng booking
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'car_id'); // Mối quan hệ 1-n với bookings
    }

    // Thiết lập mối quan hệ với bảng car_image
    public function images()
    {
        return $this->hasMany(CarImage::class, 'car_id'); // Mối quan hệ 1-n với car_image
    }

    // Thiết lập mối quan hệ với bảng Feedback
    public function feedback()
    {
        return $this->hasMany(Feedback::class, 'car_id'); // Mối quan hệ 1-n với Feedback
    }
    public function favorite()
    {
        return $this->hasMany(Favorite::class, 'car_id');
    }
}
