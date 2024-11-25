<?php


use App\Http\Controllers\ApiAdmin\BookingController;
use Illuminate\Support\Facades\Route;



Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('/booking', [BookingController::class, 'index']); // Lấy tất cả booking
    Route::post('/booking', [BookingController::class, 'store']); // Tạo booking mới
    Route::get('/booking/{id}', [BookingController::class, 'show']); // Lấy chi tiết booking
    Route::put('/booking/{id}', [BookingController::class, 'update']); // Cập nhật booking
    Route::delete('/booking/{id}', [BookingController::class, 'destroy']); // Xóa booking
    Route::put('/booking/{id}/cancel_by_admin', [BookingController::class, 'cancelByAdmin']); //Hủy booking do admin

});

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**                         
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/booking        | GET           | Lây danh sách booking                
 *  http://localhost:8000/api/admin/booking        | POST          | Tạo một booking                      
 *  http://localhost:8000/api/admin/booking/{id}   | GET           | Lấy chi tiết booking                 
 *  http://localhost:8000/api/admin/booking/{id}   | PUT           | Cập nhật một booking                 
 *  http://localhost:8000/api/admin/booking/{id}   | DELETE        | Xóa một booking                      
 * 
 */
