<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MailController;
Route::prefix('mail')->group(function () {
    Route::post('/contact', [MailController::class, 'mailContact']);
});