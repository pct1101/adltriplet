<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Models\Booking;
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

        // Kiểm tra và tách các tham số min và max cho rental_price
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

        // Query danh sách xe
        $cars = Car::query()
            // Lọc theo rental_price
            ->when(isset($rentalPriceFilters['min']), function ($query) use ($rentalPriceFilters) {
                $query->where('rental_price', '>=', $rentalPriceFilters['min']);
            })
            ->when(isset($rentalPriceFilters['max']), function ($query) use ($rentalPriceFilters) {
                $query->where('rental_price', '<=', $rentalPriceFilters['max']);
            })
            // Lọc theo car_name
            ->when($request->has('car_name'), function ($query) use ($request) {
                $carName = $request->query('car_name');
                return $query->where('car_name', 'like', "%$carName%");
            })
            // Lọc theo số ghế
            ->when($request->has('seats'), function ($query) use ($request) {
                $seats = $request->query('seats');
                return $query->where('seats', '=', $seats);
            })
            // Lọc theo transmission_type
            ->when($request->has('transmission_type'), function ($query) use ($request) {
                $transmissionType = $request->query('transmission_type');
                return $query->where('transmission_type', $transmissionType);
            })
            // Lọc theo fuel_type
            ->when($request->has('fuel_type'), function ($query) use ($request) {
                $fuelType = $request->query('fuel_type');
                return $query->where('fuel_type', $fuelType);
            })
            // Lọc theo model (năm sản xuất)
            ->when($request->has('model'), function ($query) use ($request) {
                $model = $request->query('model');
                return $query->whereYear('model', $model);
            })
            // Lọc theo car_status
            ->when($request->has('car_status'), function ($query) use ($request) {
                $carStatus = $request->query('car_status');
                return $query->where('car_status', $carStatus);
            })
            // Lọc theo brandid (hãng xe)
            ->when($request->has('brandid'), function ($query) use ($request) {
                $brandId = $request->query('brandid');
                return $query->where('brandid', $brandId);
            })
            // Kiểm tra ngày bắt đầu và ngày kết thúc
            ->when($request->has('start_date') && $request->has('end_date'), function ($query) use ($request) {
                $startDate = $request->query('start_date');
                $endDate = $request->query('end_date');

                // Chỉ lấy các xe không có booking nào trong thời gian này
                $query->whereDoesntHave('bookings', function ($q) use ($startDate, $endDate) {
                    $q->where('booking_status', 1) // Chỉ kiểm tra các booking đang hoạt động
                        ->where(function ($query) use ($startDate, $endDate) {
                            $query->whereBetween('start_date', [$startDate, $endDate])
                                ->orWhereBetween('end_date', [$startDate, $endDate])
                                ->orWhere(function ($q) use ($startDate, $endDate) {
                                    $q->where('start_date', '<=', $startDate)
                                        ->where('end_date', '>=', $endDate);
                                });
                        });
                });
            })
            ->get();

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

}
