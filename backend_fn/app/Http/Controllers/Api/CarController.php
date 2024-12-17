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
            // Lấy tất cả query parameters
            $filters = $request->query();

            // Kiểm tra min/max price
            $minPrice = $request->query('min');
            $maxPrice = $request->query('max');
            if ($minPrice || $maxPrice) {
                if ($minPrice && !is_numeric($minPrice)) {
                    return response()->json(['error' => 'Giá min phải là số'], 400);
                }
                if ($maxPrice && !is_numeric($maxPrice)) {
                    return response()->json(['error' => 'Giá max phải là số'], 400);
                }
                if ($minPrice && $maxPrice && $minPrice > $maxPrice) {
                    return response()->json(['error' => 'Giá min không được lớn hơn giá max'], 400);
                }
            }

            // Kiểm tra ngày bắt đầu và kết thúc
            $startDate = $request->query('start_date');
            $endDate = $request->query('end_date');
            if ($startDate && $endDate && strtotime($endDate) <= strtotime($startDate)) {
                return response()->json(['error' => 'Ngày kết thúc phải sau ngày bắt đầu'], 422);
            }

            // Tạo query với các bộ lọc
            $cars = Car::query()
                ->when($minPrice, fn($query) => $query->where('rental_price', '>=', $minPrice))
                ->when($maxPrice, fn($query) => $query->where('rental_price', '<=', $maxPrice))
                ->when($request->has('car_name'), fn($query) => $query->where('car_name', 'like', '%' . $filters['car_name'] . '%'))
                ->when($request->has('seats'), fn($query) => $query->where('seats', $filters['seats']))
                ->when($request->has('transmission_type'), fn($query) => $query->where('transmission_type', $filters['transmission_type']))
                ->when($request->has('fuel_type'), fn($query) => $query->where('fuel_type', $filters['fuel_type']))
                ->when($request->has('model'), fn($query) => $query->whereYear('model', $filters['model']))
                ->when($request->has('car_status'), fn($query) => $query->where('car_status', $filters['car_status']))
                ->when($request->has('brand_name'), fn($query)=> $query->whereHas('brand', function ($q) use ($filters){
                    $q->where('brand_name', 'like', '%' . $filters['brand_name'] . '%');
                }))
                ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                    $query->whereDoesntHave('bookings', function ($q) use ($startDate, $endDate) {
                        $q->where('booking_status', 1)
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
                ->with('brand')
                ->get();

            // Trả về kết quả nếu có dữ liệu
            if ($cars->isEmpty()) {
                return response()->json(['message' => 'Không tìm thấy xe nào phù hợp với tiêu chí lọc'], 404);
            }

            return response()->json(['cars' => $cars], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Lỗi không mong muốn: ' . $e->getMessage()], 500);
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
}
