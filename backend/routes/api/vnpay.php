<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PaymentController;


Route::prefix('vnpay')->group(function () {
    Route::post('/createpayment/{booking_id}', [PaymentController::class, 'createPayment']);

    //Xử lý kể quả thanh toán VNPAY
    Route::get('/return', [PaymentController::class, 'process'])->name('payment.return');
});