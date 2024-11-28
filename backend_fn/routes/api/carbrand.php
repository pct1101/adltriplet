<?php

use App\Http\Controllers\Api\CarBrandController;
use Illuminate\Support\Facades\Route;


/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/brand                | GET           | DS brand và xem theo brand
 *  http://localhost:8000/api/brand/{id}           | GET           | CT 1 brand và xe theo brand
 */

Route::prefix('brand')->group(function () {
    Route::get('/', [CarBrandController::class, 'index']);
    Route::get('/{id}', [CarBrandController::class, 'show']);

});