<?php

use App\Http\Controllers\Api\VoucherController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                      |**Phương thức**| **Mô tả**                         
 * ----------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/voucher         | GET           | Lây danh sách voucher                
 *  http://localhost:8000/api/admin/voucher         | POST          | Tạo một voucher                      
 *  http://localhost:8000/api/admin/voucher/{id}    | GET           | Lấy chi tiết voucher                 
 *  http://localhost:8000/api/admin/voucher/{id}    | PUT           | Cập nhật một voucher                 
 *  http://localhost:8000/api/admin/voucher/{id}    | DELETE        | Xóa một voucher                      
 * 
 */
Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('/voucher', [VoucherController::class, 'index']); // Lấy danh sách tất cả voucher
    Route::post('/voucher', [VoucherController::class, 'store']); // Tạo voucher mới
    Route::put('/voucher/{id}', [VoucherController::class, 'update']); // Sửa voucher
    Route::delete('/voucher/{id}', [VoucherController::class, 'destroy']); // Xóa voucher
});
