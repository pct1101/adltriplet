<?php


use App\Http\Controllers\ApiAdmin\UserController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                      |**Phương thức**| **Mô tả**                         
 * ----------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/user         | GET           | Lây danh sách user                
 *  http://localhost:8000/api/admin/user         | POST          | Tạo một user                      
 *  http://localhost:8000/api/admin/user/{id}    | GET           | Lấy chi tiết user                 
 *  http://localhost:8000/api/admin/user/{id}    | PUT           | Cập nhật một user                 
 *  http://localhost:8000/api/admin/user/{id}    | DELETE        | Xóa một user                      
 * 
 */

Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::post('/user', [UserController::class, 'store']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
});