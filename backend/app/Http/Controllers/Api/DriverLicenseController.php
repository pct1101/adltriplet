<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\DriverLicenses;
use Illuminate\support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DriverLicenseController extends Controller
{
    public function show($id)
    {
        // Lấy ra tất cả giấy phép lái xe của người dùng theo user_id
        $driver_licenses = DriverLicenses::where('user_id', $id)->get();

        // Kiểm tra xem người dùng có giấy phép lái xe nào không
        if ($driver_licenses->isEmpty()) {
            return response(['message' => 'No Driver Licenses found for this user'], 404);
        }

        // Trả về danh sách giấy phép lái xe
        return response()->json(['driver_licenses' => $driver_licenses], 200);
    }

    public function store(Request $request)
    {
        try {
            // Xác thực dữ liệu thông qua DriverLicenseRequest
            $driver_license_request = new DriverLicenseRequest($request->all());
            $validatedData = $driver_license_request->validate();

            // Lấy ID của người dùng đang đăng nhập
            $userId = Auth::id();

            // Kiểm tra nếu không có user_id (người dùng chưa đăng nhập)
            if (!$userId) {
                return response()->json(['error' => 'Người dùng chưa đăng nhập'], 401);
            }

            // Kiểm tra và xử lý file ảnh giấy phép
            if ($request->hasFile('license_image')) {
                try {
                    // Xử lý file ảnh
                    $image = $request->file('license_image');
                    $imageName = $image->getClientOriginalName(); // Đặt tên file
                    $image->move(public_path('license_images'), $imageName); // Di chuyển vào thư mục public/license_images
                    $imagePath = 'license_images/' . $imageName; // Lưu đường dẫn vào DB
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Không thể tải lên ảnh giấy phép', 'message' => $e->getMessage()], 500);
                }
            } else {
                return response()->json(['error' => 'Ảnh giấy phép là bắt buộc'], 400);
            }

            // Tạo driver license mới
            $driver_license = DriverLicenses::create([
                'user_id' => $userId,
                'license_number' => $validatedData['license_number'],
                'license_holder' => $validatedData['license_holder'],
                'license_image' => $imagePath
            ]);

            // Phản hồi thành công
            return response()->json([
                'message' => 'Tạo giấy phép lái xe thành công',
                'data' => $driver_license
            ], 201);
        } catch (ValidationException $e) {
            // Xử lý lỗi khi xác thực
            return response()->json([
                'error' => 'Lỗi xác thực dữ liệu',
                'messages' => $e->validator->errors()->all()
            ], 400);
        } catch (\Exception $e) {
            // Xử lý lỗi khác
            return response()->json([
                'error' => 'Đã xảy ra lỗi trong quá trình xử lý',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Xác thực dữ liệu đầu vào
        try {
            $driver_license_request = new DriverLicenseRequest($request->all());
            $validatedData = $driver_license_request->validate();

            // Lấy ID của người dùng đang đăng nhập
            $user_id = Auth::id();
            if (!$user_id) {
                return response()->json(['error' => 'Người dùng chưa đăng nhập'], 401);
            }

            // Lấy ra giấy phép lái xe cần cập nhật
            $driver_license = DriverLicenses::where('user_id', $user_id)
                ->where('driver_license_id', $id)
                ->first();

            // Kiểm tra giấy phép lái xe này có tồn tại không
            if (!$driver_license) {
                return response()->json(['error' => 'Không tìm thấy giấy phép lái xe'], 404);
            }

            // Cập nhật giấy phép lái xe
            // Cập nhật thông tin lái xe
            $driver_license->license_number = $request->license_number;
            $driver_license->license_holder = $request->license_holder;

            // Xử lý hình ảnh và lưu vào thư mục public/license_images (nếu có)
            if ($request->hasFile('license_image')) {
                // Xóa hình ảnh cũ nếu có
                if ($driver_license->license_image && file_exists(public_path($driver_license->license_image))) {
                    unlink(public_path($driver_license->license_image));
                }

                // Xử lý và lưu hình ảnh mới
                $image = $request->file('license_image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('license_images'), $imageName);
                $driver_license->license_image = 'license_images/' . $imageName;
            }

            // Lưu bản ghi đã cập nhật
            $driver_license->save();

            return response()->json(['message' => 'Cập nhật giấy phép lái xe thành công', 'data' => $driver_license], 200);
        } catch (\Exception $e) {
            // Xử lý lỗi khi có lỗi xảy ra
            return response()->json([
                'error' => 'Cập nhật giấy phép lái xe thất bại', 'message' => $e->getMessage()], 500);
        }
    }
}
