<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\Validator;

class CarController
{
    // Lấy danh sách tất cả xe
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    // Lấy thông tin xe theo ID
    public function show($id)
    {
        // Tìm xe theo ID và tải hình ảnh
        $car = Car::with('images', 'feedback')->find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        // Trả về thông tin xe và hình ảnh
        return response()->json([
            'car' => $car
        ]);
    }

    // Lấy tất cả xe theo brand_id
    public function getCarsByBrandId($id)
    {
        // Lấy danh sách xe theo brand_id
        $cars = Car::where('brandid', $id)->get();

        // Kiểm tra nếu không tìm thấy xe
        if ($cars->isEmpty()) {
            return response()->json(['message' => 'No cars found for this brand'], 404);
        }

        // Trả về danh sách xe
        return response()->json($cars);
    }
}
