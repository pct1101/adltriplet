<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contact'; // Đặt tên bảng
    protected $primaryKey = 'contact_id';
    protected $fillable = [
        'phone',
        'name_customer',
        'content',
        'status',
        'create_at',
        'updated_at'
    ];
}
