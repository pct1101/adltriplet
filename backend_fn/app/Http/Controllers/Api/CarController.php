<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class CarController
{
    // Lấy danh sách xe với bộ lọc
    public function index(Request $request)
    {
        try {
            // Lấy tất cả các tham số lọc từ query string
            $filters = $request->query();
            $rentalPriceFilters = [];

            // Kiểm tra và tách các tham số min và max cho rental_price nếu có
            if ($request->has('min') || $request->has('max')) {
                $min = $request->query('min');
                $max = $request->query('max');

                // Kiểm tra giá trị min và max có phải là số không
                if ($min && !is_numeric($min)) {
                    return response()->json(['error' => 'Giá min phải là một số hợp lệ'], 400);
                }

                if ($max && !is_numeric($max)) {
                    return response()->json(['error' => 'Giá max phải là một số hợp lệ'], 400);
                }

                // Kiểm tra min phải nhỏ hơn max nếu cả 2 đều có giá trị
                if ($min && $max && $min > $max) {
                    return response()->json(['error' => 'Giá min phải nhỏ hơn giá max'], 400);
                }

                $rentalPriceFilters = [
                    'min' => $min,
                    'max' => $max,
                ];
            }

            // Chèn các tham số rental_price vào bộ lọc chung
            if ($rentalPriceFilters) {
                $filters['rental_price'] = $rentalPriceFilters;
            }

            // Kiểm tra lọc theo tên xe
            if ($request->has('car_name') && !is_string($request->query('car_name'))) {
                return response()->json(['error' => 'Tên xe phải là một chuỗi'], 400);
            }

            // Kiểm tra lọc theo số ghế
            if ($request->has('seats')) {
                $seats = $request->query('seats');
                if (!is_numeric($seats) || $seats <= 0) {
                    return response()->json(['error' => 'Số ghế phải là một số dương hợp lệ'], 400);
                }
            }

            // Kiểm tra lọc theo hộp số
            if ($request->has('transmission_type') && !in_array($request->query('transmission_type'), ['Số sàn', 'Số tự động'])) {
                return response()->json(['error' => 'Loại hộp số không hợp lệ. Chỉ hỗ trợ Số sàn hoặc Số tự động'], 400);
            }

            // Kiểm tra lọc theo loại nhiên liệu
            if ($request->has('fuel_type') && !in_array($request->query('fuel_type'), ['Xăng', 'Dầu', 'Điện'])) {
                return response()->json(['error' => 'Loại nhiên liệu không hợp lệ. Chỉ hỗ trợ Xăng, Dầu hoặc Điện'], 400);
            }

            // Kiểm tra lọc theo năm sản xuất
            if ($request->has('model')) {
                $model = $request->query('model');
                if (!is_numeric($model) || $model <= 1900 || $model > date('Y')) {
                    return response()->json(['error' => 'Năm sản xuất không hợp lệ'], 400);
                }
            }

            // Kiểm tra lọc theo trạng thái xe
            if ($request->has('car_status') && !in_array($request->query('car_status'), [0, 1])) {
                return response()->json(['error' => 'Trạng thái xe phải là 0 hoặc 1'], 400);
            }

            // Kiểm tra lọc theo thương hiệu
            if ($request->has('brandid') && !is_numeric($request->query('brandid'))) {
                return response()->json(['error' => 'ID thương hiệu phải là một số hợp lệ'], 400);
            }

            // Áp dụng các bộ lọc thông qua phương thức filter của model Car
            $cars = Car::filter($filters)->with('brand')->get();

            // Kiểm tra nếu không có dữ liệu sau khi lọc
            if ($cars->isEmpty()) {
                return response()->json(['message' => 'Không tìm thấy xe nào phù hợp với tiêu chí lọc'], 404);
            }

            // Trả về kết quả nếu không có lỗi
            return response()->json($cars);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => 'Lỗi trong quá trình lọc dữ liệu: ' . $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đã xảy ra lỗi không mong muốn: ' . $e->getMessage()], 500);
        }
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

    public function getCarsBySeat($id)
    {
        $cars = Car::where('seats', $id)->get();
        if ($cars->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy xe với số ghế tương tự'], 404);
        }
        return response()->json(['message' => 'Danh sách xe có ' . $id . ' ghế', 'cars' => $cars]);
    }
    public function getCarsByTransmissionType(Request $request)
    {
        $cars = Car::where('transmission_type', $request->transmission_type)->get();
        if ($cars->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy xe'], 404);
        }
        return response()->json(['message' => 'Danh sách xe']);
    }

    // public function getCarsByFuelType($id)
    // {
    //     $cars = Car::where('fuel_type', $id)->get();
    //     if ($cars->isEmpty()) {
    //         return response()->json(['message' => 'Không tìm thấy xe với nhiên liệu '. $], 404);
    //     }
    //     return response()->json(['message' => 'Danh sách xe']);
    // }

    public function filterCars(Request $request)
    {
        $query = Car::query();
        if ($request->has('seats')) {
            $carSeat = Car::where('seats')->get();
        }



        // Lọc theo số ghế
        if ($request->has('seats') && $request->seats !== null) {
            $query->where('seats', $request->seats);
        }

        // Lọc theo loại hộp số
        if ($request->has('transmission_type') && $request->transmission_type !== null) {
            $query->where('transmission_type', $request->transmission_type);
        }

        // Lọc theo loại nhiên liệu
        if ($request->has('fuel_type') && $request->fuel_type !== null) {
            $query->where('fuel_type', $request->fuel_type);
        }

        // Lọc theo năm sản xuất
        if ($request->has('model') && $request->model !== null) {
            $query->where('model', $request->model);
        }

        // Lọc theo trạng thái xe
        if ($request->has('car_status') && $request->car_status !== null) {
            $query->where('car_status', $request->car_status);
        }

        // Lấy kết quả
        $cars = $query->get();

        // Kiểm tra nếu không có xe nào phù hợp
        if ($cars->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy xe phù hợp với tiêu chí lọc'], 404);
        }

        return response()->json(['message' => 'Danh sách xe phù hợp', 'cars' => $cars]);
    }
}
