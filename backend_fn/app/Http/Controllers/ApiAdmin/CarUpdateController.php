<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\Car; // Import model Car
use App\Http\Requests\CarUpdateRequest; // Import request validator
use Illuminate\Support\Facades\Storage; // Để làm việc với lưu trữ file
use Illuminate\Support\Str; // Để tạo tên ngẫu nhiên cho file
use Exception;

class CarUpdateController extends Controller
{
    /**
     * Update an existing car.
     *
     * @param CarUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CarUpdateRequest $request, $id)
    {
        try {
            // Tìm xe theo ID
            $car = Car::find($id);
            if (!$car) {
                return response()->json([
                    'message' => 'Car not found.'
                ], 404);
            }

            // Cập nhật thông tin cơ bản
            $car->car_name = $request->car_name;
            $car->seats = $request->seats;
            $car->transmission_type = $request->transmission_type;
            $car->fuel_type = $request->fuel_type;
            $car->model = $request->model;
            $car->license_plate = $request->license_plate;
            $car->rental_price = $request->rental_price;
            $car->car_status = $request->car_status ?? $car->car_status;
            $car->mileage = $request->mileage;
            $car->car_description = $request->car_description;

            // Xử lý cập nhật hình ảnh
            // if ($request->hasFile('car_image') && $request->file('car_image')->isValid()) {
            if($request->car_image){
                // Sử dụng public storage
                $storage = Storage::disk('public');

                // Xóa ảnh cũ nếu tồn tại
                if ($storage->exists($car->car_image)) {
                    $storage->delete($car->car_image);
                }

                // Lưu ảnh mới
                $imageName = 'imgs/' . Str::random(32) . "." . $request->car_image->getClientOriginalExtension();
                $storage->put($imageName, file_get_contents($request->car_image));

                // Lưu tên file vào cơ sở dữ liệu
                $car->car_image = $imageName;
            }

            // Lưu cập nhật vào cơ sở dữ liệu
            $car->save();

            // Trả về phản hồi JSON
            return response()->json([
                'message' => 'Car successfully updated.',
                'data' => $car
            ], 200);
        } catch (Exception $e) {
            // Trả về phản hồi lỗi
            return response()->json([
                'message' => 'Something went really wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
