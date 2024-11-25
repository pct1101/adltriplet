<?php


use App\Http\Controllers\ApiAdmin\BannerController;
use Illuminate\Support\Facades\Route;


Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('banner', [BannerController::class, 'index']);
    Route::post('banner', [BannerController::class, 'store']);
    Route::get('banner/{id}', [BannerController::class, 'show']);
    Route::put('banner/{id}', [BannerController::class, 'update']);
    Route::delete('banner/{id}', [BannerController::class, 'destroy']);
});

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**                         
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/banner         | GET           | Lây danh sách banner                
 *  http://localhost:8000/api/admin/banner         | POST          | Tạo một banner                   
 *  http://localhost:8000/api/admin/banner/{id}    | GET           | Lấy chi tiết banner                 
 *  http://localhost:8000/api/admin/banner/{id}    | PUT           | Cập nhật một banner                 
 *  http://localhost:8000/api/admin/banner/{id}    | DELETE        | Xóa một banner                      
 * 
 */
