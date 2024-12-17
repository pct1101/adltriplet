<?php

use App\Http\Controllers\Api\BookingController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/booking              | GET           | Lây danh sách đơn hàng
 *  http://localhost:8000/api/booking              | POST          | Booking một xe
 *  http://localhost:8000/api/booking/{id}         | GET           | Chi tiết booking
 *  http://localhost:8000/api/booking/{id}/cancel_by_user         | PUT           | Hủy booking
 *  http://localhost:8000/api/booking/{id}         | DELETE        | Hủy booking
 *
 */

Route::middleware('auth:sanctum')->prefix('booking')->group(function () {
    // Tạo booking mới
    Route::post('/', [BookingController::class, 'create']);

    // Danh sách bookings của người dùng
    Route::get('/', [BookingController::class, 'index']);

    // Chi tiết một booking
    Route::get('{id}', [BookingController::class, 'show']);

    // Cập nhật một booking
    Route::put('/{id}', [BookingController::class, 'update']);

    // Xóa một booking
    Route::delete('{id}', [BookingController::class, 'destroy']);

    //Hủy booking do user
    Route::put('/{id}/cancel_by_user', [BookingController::class, 'cancelByUser']);
});
