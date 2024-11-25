<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $table = 'banner';  // Tên bảng
    protected $primaryKey = 'banner_id';  // Khóa chính

    protected $fillable = [
        'banner_url',        // Đường dẫn banner
        'banner_status',     // Trạng thái banner
    ];
}