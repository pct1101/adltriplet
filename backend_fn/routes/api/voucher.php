<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VoucherController;
Route::prefix('voucher')->group(function () {
    Route::get('/apply-voucher', [VoucherController::class, 'applyVoucher']);
});
