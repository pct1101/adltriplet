<?php

use App\Http\Controllers\ControllerAdminAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\aadmin;
use App\Http\Controllers\AdminCarContrloller;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');





Route::get('/car', [CarController::class, 'get_car']);                     // http://127.0.0.0.8000/api/car       phương thức get        (Lấy tất cả các xe)
Route::get('/car/{id}', [CarController::class, 'get_details_car']);        // http://127.0.0.0.8000/api/car/{id}  phương thức get        (Lấy chi tiết xe)
Route::get('/carbrand', [CarController::class, 'get_brands_car']);    // http://127.0.0.0.8000/carbrand/{id}      phương thức get        (Lấy hãng xe của xe)
Route::get('/carbrand/{id}', [CarController::class, 'get_brands_of_car']);    // http://127.0.0.0.8000/carbrand/{id}      phương thức get        (Lấy hãng xe của xe)
Route::get('/carimage/{id}', [CarController::class, 'get_sub_image_of_car']); // http://127.0.0.0.8000/{id}       phương thức get        (ảnh con của xe)


Route::middleware(['auth:api', \App\Http\Middleware\CheckRole::class])->group(function () {

    //------------------------------------------------Thêm xóa sửa xe--------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    //---------------          http://127.0.0.0.8000/api/admin       (lấy cars và brands ) phương thức get          ---------------//
    //---------------          http://127.0.0.0.8000/api/admin       (lấy cars và brands ) phương thức post         ---------------//
    //---------------          http://127.0.0.0.8000/api/admin/{id}  (lấy 1 car  )         phương thức get          ---------------//
    //---------------          http://127.0.0.0.8000/api/admin/{id}  (update 1 car )       phương thức update       ---------------//
    //---------------          http://127.0.0.0.8000/api/admin/{id}  (detele 1 car )       phương thức delete       ---------------//

    Route::apiResource('/admin', AdminCarContrloller::class);
    //-----------------------------------------------------------------------------------------------------------------------------//



    //------------------------------------------------Lấy api bảng users-----------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    //--------------           http://127.0.0.0.8000/api/adminusersapi (lấy user)          phương thức get          ---------------//

    Route::get('/adminusersapi', [AdminCarContrloller::class, 'get_user_api']);
    //-----------------------------------------------------------------------------------------------------------------------------//



    //------------------------------------------------Lấy api feedback ------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    //-------------           http://127.0.0.0.8000/api/adminfeedbackapi (lấy feedback)    phương thức get          ---------------//
    Route::get('/adminfeedbackapi', [AdminCarContrloller::class, 'get_feedback_api']);




    //------------------------------------------------Lấy api favorite car --------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------//
    //-------------           http://127.0.0.0.8000/api/adminfavoriteapi (lấy favorite)    phương thức get          ---------------//
    Route::get('/adminfavoriteapi', [AdminCarContrloller::class, 'get_favorite_api']);
});