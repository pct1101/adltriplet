<?php

use App\Http\Controllers\Api\CarController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                             |**Phương thức**| **Mô tả**
 * -----------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/cars/                     | GET           | Danh sách xe
 *  http://localhost:8000/api/cars/{id}                 | GET           | Chi tiết 1 xe
 *  http://localhost:8000/api/cars/brand/{id}           | GET           | Lấy ra xe dựa vào hãng
 *  http://localhost:8000/api/cars/seats/{id}           | GET           | Lấy ra xe dựa vào số ghế
 */

Route::prefix('cars')->group(function () {
    Route::get('/', [CarController::class, 'index']);
    Route::get('/{id}', [CarController::class, 'show']);
    Route::get('/brand/{id}', [CarController::class, 'getCarsByBrandId']);
    Route::get('/seat/{id}', [CarController::class, 'getCarsBySeat']);
    Route::get('/transmission', [CarController::class, 'getCarsByTransmissionType']);
    Route::get('/filter', [CarController::class, 'filterCars']);
});