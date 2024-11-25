<?php


use App\Http\Controllers\ApiAdmin\CarUpdateController;
use Illuminate\Support\Facades\Route;


Route::prefix('admin')->middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {
    Route::put('/carupdate/{id}', [CarUpdateController::class, 'update']);
});

