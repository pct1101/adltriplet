<?php

use App\Http\Controllers\Api\FeedbackController;
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

Route::middleware('auth:sanctum')->prefix('feedback')->group(function () {

    // Tạo feedback mới
    Route::post('/car/{id}', [FeedbackController::class, 'store']);
    // Danh sách feedbacks của xe
    Route::get('/car/{id}', [FeedbackController::class, 'index']);
    // Chi tiết feedback
    Route::get('/{id}', [FeedbackController::class, 'show']);
    // Cập nhật feedback
    // Route::put('/{id}', [FeedbackController::class, 'update']);
    // Xóa feedback
    Route::delete('/{id}', [FeedbackController::class, 'destroy']);
});
