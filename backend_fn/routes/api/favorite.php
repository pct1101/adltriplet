<?php

use App\Http\Controllers\Api\FavoriteController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**                         
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/feedback/car/{id}    | GET           | Lây danh sách feedback theo xe               
 *  http://localhost:8000/api/feedback/car/{id}    | POST          | Feedback                      
 *  http://localhost:8000/api/feedback/{id}        | GET           | Chi tiết feedback                            
 *  http://localhost:8000/api/feedback/{id}        | DELETE        | Hủy booking                      
 * 
 */

Route::middleware('auth:sanctum')->prefix('favorite')->group(function () {
    Route::get('/', [FavoriteController::class, 'index']);
    Route::get('/{id}', [FavoriteController::class, 'show']);
    Route::post('/{id}', [FavoriteController::class, 'store']);
    Route::delete('/{id}', [FavoriteController::class, 'destroy']);
});
