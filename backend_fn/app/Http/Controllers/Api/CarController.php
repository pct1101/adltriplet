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
            // Kiểm tra filter_type
            $filterType = $request->query('filter_type');

            // Nếu filter_type là "all", chỉ lấy tất cả xe
            if ($filterType === 'all') {
                $cars = Car::with('brand')->get();

                // Kiểm tra nếu không có xe
                if ($cars->isEmpty()) {
                    return response()->json(['message' => 'Không có xe nào trong hệ thống'], 404);
                }

                return response()->json(['cars' => $cars], 200);
            }

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
            // Strotime chuyển thời gian thành giây để so sánh
            if ($startDate && $endDate && strtotime($endDate) <= strtotime($startDate)) {
                return response()->json(['error' => 'Ngày kết thúc phải sau ngày bắt đầu'], 422);
            }

            // Tạo query với các bộ lọc
            $cars = Car::query()
                // Phương thức `when` kiểm tra các điều kiện có tồn tại và thực thi câu truy vấn tương ứng:
                //->when($condition, function($query) : codition(điều kiện), function($query) điều kiện true thì được thực thi
                ->when($minPrice, fn($query) => $query->where('rental_price', '>=', $minPrice)) // Nếu có `minPrice`, lọc theo giá thuê >= minPrice
                ->when($maxPrice, fn($query) => $query->where('rental_price', '<=', $maxPrice)) // Nếu có `maxPrice`, lọc theo giá thuê <= maxPrice
                ->when($request->has('car_name'), fn($query) => $query->where('car_name', 'like', '%' . $filters['car_name'] . '%')) // Nếu có `car_name`, tìm xe có tên giống với giá trị trong `car_name`
                ->when($request->has('seats'), fn($query) => $query->where('seats', $filters['seats'])) // Nếu có `seats`, lọc theo số ghế
                ->when($request->has('transmission_type'), fn($query) => $query->where('transmission_type', $filters['transmission_type'])) // Nếu có `transmission_type`, lọc theo loại hộp số (số tự động hay số sàn)
                ->when($request->has('fuel_type'), fn($query) => $query->where('fuel_type', $filters['fuel_type'])) // Nếu có `fuel_type`, lọc theo loại nhiên liệu (xăng, dầu, điện)
                ->when($request->has('model'), fn($query) => $query->whereYear('model', $filters['model'])) // Nếu có `model`, lọc theo năm sản xuất
                ->when($request->has('car_status'), fn($query) => $query->where('car_status', $filters['car_status'])) // Nếu có `car_status`, lọc theo trạng thái của xe (ví dụ: sẵn sàng cho thuê, đang bảo trì, ...)
                ->when($request->has('brand_name'), fn($query) => $query->whereHas('brand', function ($q) use ($filters) {
                    $q->where('brand_name', 'like', '%' . $filters['brand_name'] . '%'); // Nếu có `brand_name`, lọc theo tên thương hiệu của xe (có chứa chuỗi trong `brand_name`)
                }))
                ->when($startDate && $endDate, function ($query) use ($startDate, $endDate) {
                    // Nếu có `startDate` và `endDate`, lọc theo những xe chưa được đặt trong khoảng thời gian này
                    $query->whereDoesntHave('bookings', function ($q) use ($startDate, $endDate) {
                        // Kiểm tra bảng `bookings` để đảm bảo không có booking nào trùng với khoảng thời gian đang tìm
                        $q->where('booking_status', 1) // Chỉ xét các booking có trạng thái là đã xác nhận (1)
                            ->where(function ($query) use ($startDate, $endDate) {
                                // Kiểm tra booking có ngày bắt đầu và kết thúc trong khoảng thời gian tìm
                                $query->whereBetween('start_date', [$startDate, $endDate]) // booking bắt đầu trong khoảng thời gian
                                    ->orWhereBetween('end_date', [$startDate, $endDate]) // hoặc booking kết thúc trong khoảng thời gian
                                    ->orWhere(function ($q) use ($startDate, $endDate) {
                                        // Hoặc booking có ngày bắt đầu sớm hơn và ngày kết thúc muộn hơn so với khoảng thời gian
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
