<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\DriverLicenses;
use Exception;
use Illuminate\Support\Facades\Storage;

class DriverLicenseController extends Controller
{
    /**
     * Update an existing driver_licenses.
     *
     * @param DriverLicenseRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */

    // Lấy ra danh sách giấy phép lái xe của người dùng
    public function index()
    {
        $user_id = Auth::id();
        $driver_licenses = DriverLicenses::where('user_id', $user_id)->get();

        // Kiểm tra xem người dùng có giấy phép lái xe nào không
        if ($driver_licenses->isEmpty()) {
            return response(['message' => 'Không tìm thấy giấy phép lái xe nào cho người dùng này'], 404);
        }

        // Trả về danh sách giấy phép lái xe
        return response()->json(['driver_licenses' => $driver_licenses], 200);
    }

    // Lấy ra chi tiết một giấy phép lái xe của người dùng đang đăng nhập
    public function show($id)
    {
        // Lấy ra tất cả giấy phép lái xe của người dùng theo user_id
        $driver_license = DriverLicenses::where('driver_license_id', $id)->first();

        // Kiểm tra nếu không tìm thấy
        if (!$driver_license) {
            return response()->json(['message' => 'Không tìm thấy giấy phép lái xe với id: ' . $id], 404);
        }

        // Trả về danh sách giấy phép lái xe
        return response()->json(['driver_licenses' => $driver_license], 200);
    }

    // Thêm giấy phép lái xe
    public function store(DriverLicenseRequest $request)
    {
        try {
            // Lấy ID người dùng đang đăng nhập
            $user_id = Auth::id();

            // Lấy thông tin từ request
            $license_number = $request->license_number;
            $license_holder = $request->license_holder;

            // Xử lý file ảnh
            try {
                $storage = Storage::disk('public');

                // Lưu ảnh mặt trước
                $frontImageName = 'license_images/' . '_front_' . $request->file('license_image_front')->getClientOriginalName();
                $storage->put($frontImageName, file_get_contents($request->file('license_image_front')));

                // Lưu ảnh mặt sau
                $backImageName = 'license_images/' . '_back_' . $request->file('license_image_back')->getClientOriginalName();
                $storage->put($backImageName, file_get_contents($request->file('license_image_back')));

                // Kiểm tra nếu hai ảnh trùng nhau
                $frontImageContent = file_get_contents($request->file('license_image_front')->getRealPath());
                $backImageContent = file_get_contents($request->file('license_image_back')->getRealPath());
                if (md5($frontImageContent) === md5($backImageContent)) {
                    return response()->json(['error' => 'Hai ảnh mặt trước và mặt sau không được trùng nhau'], 400);
                }

            } catch (Exception $e) {
                return response()->json(['error' => 'Lỗi khi xử lý file ảnh', 'details' => $e->getMessage()], 500);
            }

            // Lưu thông tin giấy phép vào cơ sở dữ liệu
            try {
                $driver_license = DriverLicenses::create([
                    'user_id' => $user_id,
                    'license_number' => $license_number,
                    'license_holder' => $license_holder,
                    'license_image_front' => $frontImageName,
                    'license_image_back' => $backImageName,
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Lỗi không xác định xảy ra khi lưu giấy phép', 'details' => $e->getMessage(),], 500);
            }

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Thêm giấy phép lái xe thành công', 'driver_licenses' => $driver_license], 201);
        } catch (Exception $e) {
            // Trả về phản hồi lỗi không mong muốn
            return response()->json(['error' => 'Đã xảy ra lỗi không mong muốn', 'details' => $e->getMessage()], 500);
        }
    }

    // Sửa giấy phép lái xe
    public function update(DriverLicenseRequest $request, $id)
    {
        try {
            // Lấy ID người dùng đang đăng nhập
            $user_id = Auth::id();

            // Tìm giấy phép lái xe
            $driver_license = DriverLicenses::where('user_id', $user_id)->where('driver_license_id', $id)->first();
            if (!$driver_license) {
                return response()->json(['message' => 'Không tìm thấy giấy phép lái xe với id: ' . $id], 404);
            }

            // Cập nhật giấy phép lái xe
            $driver_license->license_number = $request->license_number; // Cập nhật số giấy phép lái xe
            $driver_license->license_holder = $request->license_holder; // Cập nhật chủ sở hữu giấy phép lái xe

            // Sử dụng Storage với disk 'public' để lưu ảnh
            $storage = Storage::disk('public');

            // Kiểm tra nếu cả hai ảnh được upload
            if ($request->hasFile('license_image_front') && $request->hasFile('license_image_back')) {
                $frontImageContent = file_get_contents($request->file('license_image_front')->getRealPath());
                $backImageContent = file_get_contents($request->file('license_image_back')->getRealPath());

                // Kiểm tra nội dung hai file ảnh
                if (md5($frontImageContent) === md5($backImageContent)) {
                    return response()->json(['message' => 'Hai hình ảnh giấy phép lái xe không được trùng nhau'], 400);
                }

                // Xử lý ảnh mặt trước
                if ($request->hasFile('license_image_front')) {
                    if ($storage->exists($driver_license->license_image_front)) {
                        $storage->delete($driver_license->license_image_front);
                    }
                    $frontImageName = 'license_images/' . '_front_' . $request->file('license_image_front')->getClientOriginalName();
                    $storage->put($frontImageName, $frontImageContent);
                    $driver_license->license_image_front = $frontImageName;
                }

                // Xử lý ảnh mặt sau
                if ($request->hasFile('license_image_back')) {
                    if ($storage->exists($driver_license->license_image_back)) {
                        $storage->delete($driver_license->license_image_back);
                    }
                    $backImageName = 'license_images/' . '_back_' . $request->file('license_image_back')->getClientOriginalName();
                    $storage->put($backImageName, $backImageContent);
                    $driver_license->license_image_back = $backImageName;
                }
            }

            // Lưu các thay đổi vào database
            $driver_license->save();

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Sửa giấy phép lái xe thành công', 'driver_licenses' => $driver_license], 200);
        } catch (Exception $e) {
            // Kiểm tra lỗi trùng license_number
            if ($e->getCode() === '23000') {
                return response()->json(['message' => 'Cập nhật giấy phép lái xe thất bại', 'error' => 'Số giấy phép đã tồn tại trong hệ thống.'], 400);
            }

            // Các lỗi khác
            return response()->json(['message' => 'Cập nhật giấy phép lái xe thất bại', 'error' => $e->getMessage()], 500);
        }
    }

}
