<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverLicenses extends Model
{
    use HasFactory;

    protected $table = 'driver_licenses'; // Tên bảng

    protected $primaryKey = 'driver_license_id'; //Đặt khóa chính cho bảng

    public $timestamps = true; // Bật timestamps (created_at, updated_at)

    // Lấy danh sách các thuộc tính cần thiết
    protected $fillable = [
        'user_id', // ID người dùng
        'license_number', // Số giấy phép lái xe
        'license_holder', // Tên người sở hữu giấy phép lái xe
        'license_type', // Loại giấy phép lái xe
        'license_image', // Hình giấy phép lái xe 
        'license_status', // Trạng thái giấy phép lái xe
        'issue_date', // Ngày cấp giấy phép lái xe
        'expiry_date', // Ngày hết hạn giấy phép lái xe
        'issued_by' // Cơ quan cấp giấy phép lái xe
    ];

    // Thiết lập quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
