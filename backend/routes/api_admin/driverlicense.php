<?php


use App\Http\Controllers\ApiAdmin\DriverLicenseController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/driverlicense            | GET           | Lây danh sách giấy phép lái xe
 *  http://localhost:8000/api/admin/driverlicense/{id}       | GET           | Lấy giấy lái phép lái xe theo ID
 *  http://localhost:8000/api/admin/driverlicense/{id}       | PUT           | Sửa giấy phép lái xe
 *
 */

Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('/driverlicense', [DriverLicenseController::class, 'index']);
    Route::get('/driverlicense/{id}', [DriverLicenseController::class, 'show']);
    Route::put('/driverlicense/{id}', [DriverLicenseController::class, 'update']);
});
