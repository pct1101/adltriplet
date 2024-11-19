<?php


use App\Http\Controllers\ApiAdmin\FeedbackController;
use Illuminate\Support\Facades\Route;



Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::get('/feedback', [FeedbackController::class, 'index']); // Lấy tất cả feedback
    Route::post('/feedback', [FeedbackController::class, 'store']); // Tạo feedback mới
    Route::get('/feedback/{id}', [FeedbackController::class, 'show']); // Lấy chi tiết feedback
    Route::put('/feedback/{id}', [FeedbackController::class, 'update']); // Cập nhật feedback
    Route::delete('/feedback/{id}', [FeedbackController::class, 'destroy']); // Xóa feedback
});

/**
 * # API Documentation
 *
 *  **URL**                                        |**Phương thức**| **Mô tả**                         
 * ------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/admin/feedback       | GET           | Lây danh sách feedback               
 *  http://localhost:8000/api/admin/feedback       | POST          | Tạo một feedback                      
 *  http://localhost:8000/api/admin/feedback/{id}  | GET           | Lấy chi tiết feedback                 
 *  http://localhost:8000/api/admin/feedback/{id}  | PUT           | Cập nhật một feedback                 
 *  http://localhost:8000/api/admin/feedback/{id}  | DELETE        | Xóa một feedback                     
 * 
 */
