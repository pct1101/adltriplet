<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MailController;

/**
 * # API Documentation
 *
 *  **URL**                                         |**Phương thức**| **Mô tả**
 * -------------------------------------------------|---------------|-----------------------------------
 *  http://localhost:8000/api/mail/contact     | POST          | Gửi mail liên hệ
 */

Route::prefix('mail')->group(function () {
    Route::post('/contact', [MailController::class, 'mailContact']);
});
