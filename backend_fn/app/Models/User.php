<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',         // Thêm trường phone
        'image',         // Thêm trường image
        'gender',        // Thêm trường gender
        'birth_date',    // Thêm trường birth_date
        'address',
        'activation_token',
        'api_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Thiết lập mối quan hệ với bảng Feedback
    public function feedback()
    {
        return $this->hasMany(Feedback::class, 'user_id'); // Mỗi người dùng có thể có nhiều phản hồi
    }
    public function favorite()
    {
        return $this->hasMany(Favorite::class, 'user_id');
    }
}
