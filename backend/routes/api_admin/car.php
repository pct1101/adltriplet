<?php


use App\Http\Controllers\ApiAdmin\CarController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**                         
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/car            | GET           | Lây danh sách Xe                
 *  http://localhost:8000/api/admin/car            | POST          | Tạo một xe                      
 *  http://localhost:8000/api/admin/car/{id}       | GET           | Lấy chi tiết xe                 
 *  http://localhost:8000/api/admin/car/{id}       | PUT           | Cập nhật một xe                 
 *  http://localhost:8000/api/admin/car/{id}       | DELETE        | Xóa một xe                      
 * 
 */

Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('/car', [CarController::class, 'index']);
    Route::get('/car/{id}', [CarController::class, 'show']);
    Route::post('/car', [CarController::class, 'store']);
    Route::put('/car/{id}', [CarController::class, 'update']);
    Route::delete('/car/{id}', [CarController::class, 'destroy']);
});
