<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    // Chỉ định bảng tương ứng
    protected $table = 'feedback';

    // Các thuộc tính có thể gán
    protected $fillable = [
        'content',
        'rating',
        'feedback_date',
        'user_id',
        'car_id',
    ];

    // Quan hệ với User
    public function userzz()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Quan hệ với Car
    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }
}
