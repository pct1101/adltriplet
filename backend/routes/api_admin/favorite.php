<?php


use App\Http\Controllers\ApiAdmin\FavoriteController;
use Illuminate\Support\Facades\Route;


Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    // Lấy tất cả yêu thích
    Route::get('/favorite', [FavoriteController::class, 'index']);
    // Tạo yêu thích mới
    Route::post('/favorite', [FavoriteController::class, 'store']);
    // Lấy chi tiết một yêu thích
    Route::get('/favorite/{userId}/{carId}', [FavoriteController::class, 'show']);
    // Cập nhật yêu thích
    Route::put('/favorites/{userId}/{carId}', [FavoriteController::class, 'update']);
    // Xóa yêu thích
    Route::delete('/favorite/{id}', [FavoriteController::class, 'destroy']);
});

/**
 * # API Documentation
 *
 *  **URL**                                         |**Phương thức**| **Mô tả**                         
 * -------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/favorite        | GET           | Lây danh sách yêu thcihs             
 *  http://localhost:8000/api/admin/favorite        | POST          | Tạo một yêu                   
 *  http://localhost:8000/api/admin/favorite/{U}/{C}| GET           | Lấy chi tiết yêu thích             
 *  http://localhost:8000/api/admin/favorite/{U}/{C}| PUT           | Cập nhật một yêu thích                 
 *  http://localhost:8000/api/admin/favorite/{id}   | DELETE        | Xóa một yêu thích                     
 * 
 */
