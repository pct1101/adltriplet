<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\DriverLicenses;
use Illuminate\Validation\ValidationException;

class DriverLicenseController extends Controller
{
    // Lấy danh dách tất cả các giấy phép lái xe
    public function index()
    {
        // Lấy ra tất cả giấy phép lái xe của người dùng
        $driver_licenses = DriverLicenses::all();

        // Kiểm tra xem người dùng có giấy phép lái xe nào không
        if ($driver_licenses->isEmpty()) {
            return response(['error' => 'Driver License Not Found'], 404);
        }
        // Trả về danh sách các giấy phép lái xe
        return response()->json(['driver_licenses' => $driver_licenses], 200);
    }

    public function show($id)
    {
        // Lấy ra giấy phép lái xe của người dùng theo user_id và driver_license_id
        $driver_license = DriverLicenses::where('driver_license_id', $id)
            ->first();

        // Kiểm tra nếu không tìm thấy giấy phép lái xe
        if (!$driver_license) {
            return response()->json(['error' => 'Driver License not found'], 404);
        }

        // Trả về thông tin giấy phép lái xe
        return response()->json(['driver_license' => $driver_license], 200);
    }

    public function update(Request $request, $id)
    {
        try {
            // Xác thực dữ liệu đầu vào
            $driver_license_request = new DriverLicenseRequest($request->all());
            $validatedData = $driver_license_request->validate();

            // Lấy ra giấy phép lái xe cần cập nhật
            $driver_license = DriverLicenses::findOrFail($id);

            // Cập nhật thông tin giấy phép lái xe
            $updateData = [
                'license_number' => $validatedData['license_number'],
                'license_holder' => $validatedData['license_holder'],
                'license_type' => $validatedData['license_type'] ?? $driver_license->license_type,
                'license_status' => $validatedData['license_status'] ?? $driver_license->license_status,
                'issue_date' => $validatedData['issue_date'] ?? $driver_license->issue_date,
                'expiry_date' => $validatedData['expiry_date'] ?? $driver_license->expiry_date,
                'issued_by' => $validatedData['issued_by'] ?? $driver_license->issued_by,
            ];

            // Cập nhật các trường không thay đổi
            $driver_license->update($updateData);
            // Kiểm tra và xử lý cập nhật hình ảnh (nếu có)
            if ($request->hasFile('license_image')) {
                try {
                    // Xử lý hình ảnh
                    $image = $request->file('license_image');
                    $imageName = $image->getClientOriginalName();

                    // Lưu hình ảnh vào thư mục public/license_images
                    $image->move(public_path('license_images'), $imageName);

                    // Cập nhật đường dẫn hình ảnh
                    $driver_license->license_image = 'license_images/' . $imageName;
                    $driver_license->save(); // Lưu thông tin mới
                } catch (\Exception $e) {
                    // Xử lý lỗi nếu lưu ảnh thất bại
                    return response()->json(['error' => 'Không thể tải lên ảnh giấy phép', 'message' => $e->getMessage()], 500);
                }
            }

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Cập nhật giấy phép lái xe thành công', 'data' => $driver_license], 200);
        } catch (ValidationException $e) {
            // Xử lý lỗi khi xác thực không thành công
            return response()->json(['error' => 'Lỗi xác thực dữ liệu', 'messages' => $e->validator->errors()->all()], 400);
        } catch (\Exception $e) {
            // Xử lý lỗi không mong muốn
            return response()->json(['error' => 'Không thể cập nhật giấy phép lái xe', 'message' => $e->getMessage()], 500);
        }
    }

}
