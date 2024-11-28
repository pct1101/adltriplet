<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'booking'; // Tên bảng

    protected $primaryKey = 'booking_id'; // Đặt khóa chính cho bảng

    public $timestamps = true; // Bật timestamps (created_at, updated_at)

    protected $fillable = [
        'booking_date',
        'start_date',
        'end_date',
        'total_cost',
        'total_cost_after_voucher',
        'booking_status',
        'user_id',
        'car_id',
        'address',
        'city',
        'state',
        'voucher_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }


    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'voucher_id');
    }
}