<?php

use App\Http\Controllers\aadmin;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminCarContrloller;



Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




// đường dẫn tới trang chủ
Route::get('/trangchu', [CarController::class, 'trangchu']);

//Chi tiết sản phẩm
Route::get('/detail/{id}', [CarController::class, 'getone'])->name('getone');




Route::middleware([\App\Http\Middleware\CheckRole::class])->group(function () {

    //Đường dẫn đến trang dashboard đầu tiên có biểu đồ của trang admin
    Route::get('/dashboardadmin', [aadmin::class, 'dashboardadmin']);

    //Đường dẫn đến trang admin quản lý xe
    Route::get('/admincar', [aadmin::class, 'admincar']);

    //Phương thức Post để thêm xe mới
    Route::post('/adminpost', [aadmin::class, 'store']);

    //Phương thức xóa xe
    Route::delete('/admincar/delete/{id}', [aadmin::class, 'deleteCar'])->name('car.delete');

    //Lấy xe cần edit
    Route::get('/editcaradmin/{id}', [aadmin::class, 'editcaradmin']);

    //Phương thức put để update
    Route::put('/updatecaradmin/{id}', [aadmin::class, 'updateCar']);
});

require __DIR__ . '/auth.php';
