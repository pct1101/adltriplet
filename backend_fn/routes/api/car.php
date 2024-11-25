<?php

use App\Http\Controllers\Api\CarController;
use Illuminate\Support\Facades\Route;

Route::prefix('cars')->group(function () {
    Route::get('/', [CarController::class, 'index']);         // Lấy danh sách xe
    Route::get('/{id}', [CarController::class, 'show']);
    Route::get('/brand/{id}', [CarController::class, 'getCarsByBrandId']);     // Lấy chi tiết xe

});
