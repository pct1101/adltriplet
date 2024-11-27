<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Http\Requests\CarUpdateRequest;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\File;


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

            // Xử lý ảnh nếu được tải lên
            if ($request->hasFile('car_image')) {
                $storage = Storage::disk('public');

                // Tạo tên file mới
                $carImageName =   $request->file('car_image')->getClientOriginalName();

                // Lưu ảnh vào thư mục storage/app/public/cimgs
                $storage->put($carImageName, file_get_contents($request->file('car_image')));

                // Đường dẫn file nguồn (storage/app/public)
                $sourcePath = storage_path('app/public/' . $carImageName);

                // Đường dẫn file đích (public/imgs)
                $destinationPath = public_path('imgs/' . basename($carImageName));

                // Tạo thư mục public/imgs nếu chưa tồn tại
                if (!File::exists(public_path('imgs'))) {
                    File::makeDirectory(public_path('imgs'), 0755, true);
                }

                // Di chuyển file từ storage sang public
                if (File::exists($sourcePath)) {
                    File::copy($sourcePath, $destinationPath);
                }

                // Xóa ảnh cũ nếu tồn tại
                if (!empty($car->car_image)) {
                    $oldStoragePath = storage_path('app/public/' . $car->car_image);
                    $oldPublicPath = public_path('imgs/' . basename($car->car_image));

                    if (File::exists($oldStoragePath)) {
                        File::delete($oldStoragePath);
                    }

                    if (File::exists($oldPublicPath)) {
                        File::delete($oldPublicPath);
                    }
                }

                // Cập nhật đường dẫn ảnh mới vào database
                $car->car_image = $carImageName;
            }

            // Lưu cập nhật vào cơ sở dữ liệu
            $car->save();

            // Trả về phản hồi JSON
            return response()->json(['message' => 'Car successfully updated.', 'data' => $car], 200);
        } catch (Exception $e) {
            // Trả về phản hồi lỗi
            return response()->json(['message' => 'Something went really wrong!', 'error' => $e->getMessage()], 500);
        }
    }
}
