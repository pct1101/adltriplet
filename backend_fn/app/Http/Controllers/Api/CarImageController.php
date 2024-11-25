<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\CarImage;

class CarImageController
{
    // Lấy tất cả hình ảnh theo car_id
    public function getImagesByCarId($carId)
    {
        // Lấy hình ảnh từ bảng car_image theo car_id
        $images = CarImage::where('car_id', $carId)->get(
            [
                'carImage_id',
                'carImage_url',
                'carImage_description'
            ]
        );

        // Trả về chỉ danh sách hình ảnh với các trường cần thiết
        return response()->json($images);
    }
}
