<?php

use App\Http\Controllers\Api\CarImageController;
use Illuminate\Support\Facades\Route;

Route::prefix('car-images')->group(function () {
    Route::get('/car/{carId}', [CarImageController::class, 'getImagesByCarId']);
});