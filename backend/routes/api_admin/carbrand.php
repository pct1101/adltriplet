<?php


use App\Http\Controllers\ApiAdmin\CarBrandController;
use Illuminate\Support\Facades\Route;


Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('car-brands', [CarBrandController::class, 'index']);
    Route::get('car-brands/{id}', [CarBrandController::class, 'show']);
    Route::post('car-brands', [CarBrandController::class, 'store']);
    Route::put('car-brands/{id}', [CarBrandController::class, 'update']);
    Route::delete('car-brands/{id}', [CarBrandController::class, 'destroy']);
});

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