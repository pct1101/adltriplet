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

    // Scope lọc chung
    public function scopeFilter($query, $filters)
    {
        // Lặp qua từng cặp key-value trong mảng $filters
        foreach ($filters as $key => $value) {
            // Nếu tồn tại hàm tương ứng với $key, gọi hàm đó
            if (method_exists($this, $key)) {
                $this->$key($query, $value); // Gọi hàm $key($query, $value)
            }
        }
        return $query; // Trả về query đã được áp dụng bộ lọc
    }

    // Hàm lọc theo tên xe
    public function car_name($query, $value)
    {
        // $query: Đối tượng query builder để xây dựng câu lệnh SQL
        // $value: Giá trị cần tìm kiếm trong cột 'car_name'
        // like: Cho phép giá trị tìm kiếm trên URL là dạng chuỗi
        return $query->where('car_name', 'like', "%$value%");
    }

    // Hàm lọc theo số ghế
    public function seats($query, $value)
    {
        // $query: Đối tượng query builder
        // $value: Số ghế cần lọc
        return $query->where('seats', $value);
    }

    // Hàm lọc theo loại hộp số
    public function transmission_type($query, $value)
    {
        // $query: Đối tượng query builder
        // $value: Giá trị loại hộp số ('Số sàn' hoặc 'Số tự động')
        return $query->where('transmission_type', $value);
    }

    // Hàm lọc theo loại nhiên liệu
    public function fuel_type($query, $value)
    {
        // $query: Đối tượng query builder
        // $value: Giá trị loại nhiên liệu ('Xăng', 'Dầu', hoặc 'Điện')
        return $query->where('fuel_type', $value);
    }

    // Hàm lọc theo năm sản xuất
    public function model($query, $value)
    {
        // $query: Đối tượng query builder
        // $value: Năm sản xuất cần lọc
        return $query->where('model', $value);
    }

    // Hàm lọc theo giá thuê
    public function rental_price($query, $range)
    {
        // Kiểm tra xem $range có chứa giá trị 'min' và 'max'
        if (isset($range['min'])) {
            // Đảm bảo giá trị min là số và không phải là giá trị null hoặc không hợp lệ
            $min = (float) $range['min']; // Ép kiểu thành số (float)
            $query->where('rental_price', '>=', $min);
        }

        if (isset($range['max'])) {
            // Đảm bảo giá trị max là số và không phải là giá trị null hoặc không hợp lệ
            $max = (float) $range['max']; // Ép kiểu thành số (float)
            $query->where('rental_price', '<=', $max);
        }

        return $query;
    }

    // Hàm lọc theo trạng thái xe
    public function car_status($query, $value)
    {
        // $query: Đối tượng query builder
        // $value: Giá trị trạng thái xe (1 hoặc 0)
        return $query->where('car_status', $value);
    }

    // Hàm lọc theo thương hiệu
    public function brandid($query, $value)
    {
        // $query: Đối tượng query builder
        // $value: ID của thương hiệu cần lọc
        return $query->where('brandid', $value);
    }

    // Thiết lập mối quan hệ với bảng carbrand
    public function brand()
    {
        return $this->belongsTo(CarBrand::class, 'brandid'); // Mối quan hệ nhiều-1
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
