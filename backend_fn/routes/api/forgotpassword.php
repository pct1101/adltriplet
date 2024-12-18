<?php

use App\Http\Controllers\ForgotPasswordController;
use Illuminate\Support\Facades\Route;

/**
 * # API Documentation
 *
 *  **URL**                                         |**Phương thức**| **Mô tả**
 * -------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/forgot-password       | POST          | Quên mật khẩu
 *  http://localhost:8000/api/reset-password        | POST          | Đặt lại mật khẩu
 */

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);
