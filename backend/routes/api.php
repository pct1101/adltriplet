<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/sp', [CarController::class, 'index']);
Route::get('/sp/{id}', [CarController::class, 'get_details']);
Route::get('/loai/{id}', [CarController::class, 'get_kind_of_car']);
