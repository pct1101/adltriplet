<?php

use App\Http\Controllers\Api\DriverLicenseController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/driverlicense/{id}    | GET            | Lấy ra thông tin giấy phép lái xe
 *  http://localhost:8000/api/driverlicense/        | POST           | Thêm giấy phép lái xe
 *  http://localhost:8000/api/driverlicense/{id}    | PUT            | Sửa giấy phép lái xe
 *
 */

Route::middleware('auth:sanctum')->prefix('driverlicense')->group(function () {
    Route::get('/{id}', [DriverLicenseController::class, 'show']);
    Route::post('/', [DriverLicenseController::class, 'store']);
    Route::put('/{id}', [DriverLicenseController::class, 'update']);
});
