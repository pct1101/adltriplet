<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;


/**
 * # API Documentation
 *
 *  **URL**                                         |**Phương thức**| **Mô tả**
 * -------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/auth/register         | POST          | Đăng ký
 *  http://localhost:8000/api/auth/login            | POST          | Đăng nhập
 *  http://localhost:8000/api/auth/profile          | GET           | Thông tin khách hàng
 *  http://localhost:8000/api/auth/update-profile   | PUT           | Cập nhật thông tin
 *  http://localhost:8000/api/auth/change-password  | POST          | Đổi mật khẩu
 *  http://localhost:8000/api/auth/logout           | POST          | Đăng xuất
 *
 */

Route::prefix('auth')->group(function () {
    // Đăng ký
    Route::post('/register', [AuthController::class, 'register']);

    // Đăng nhập
    Route::post('/login', [AuthController::class, 'login']);

    // Các route yêu cầu xác thực
    Route::middleware('auth:sanctum')->group(function () {
        // Thông tin khách hàng
        Route::get('/profile', [AuthController::class, 'profile']);
        // Đăng xuất
        Route::post('/logout', [AuthController::class, 'logout']);
        // Cập nhật thông tin KH
        // Route::put('/update-profile', [AuthController::class, 'updateProfile']);
        Route::put('/update', [AuthController::class, 'update']);
        // Đổi mật khẩu
        Route::post('/change-password', [AuthController::class, 'changePassword']);
    });
});
