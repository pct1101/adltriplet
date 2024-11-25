<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $table = 'favorite'; // Đặt tên bảng
    protected $primaryKey = 'favorite_id'; // Định nghĩa khóa chính

    protected $fillable = [
        'date_favorite',
        'user_id',
        'car_id',
    ];

    // Thiết lập mối quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Thiết lập mối quan hệ với bảng Car
    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
