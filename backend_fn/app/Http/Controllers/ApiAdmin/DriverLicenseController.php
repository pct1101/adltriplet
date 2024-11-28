<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use App\Models\DriverLicenses;
use Carbon\Carbon;

class DriverLicenseController extends Controller
{
    /**
     * Update an existing driver_licenses.
     *
     * @param DriverLicenseRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */

    // Lấy danh dách tất cả các giấy phép lái xe
    public function index()
    {
        // Lấy ra tất cả giấy phép lái xe
        $driver_licenses = DriverLicenses::with('user')->get();

        // Kiểm tra xem có giấy phép lái xe nào không
        if ($driver_licenses->isEmpty()) {
            return response(['error' => 'Không tìm thấy giấy phép lái xe'], 404);
        }
        // Trả về danh sách các giấy phép lái xe
        return response()->json(['driver_licenses' => $driver_licenses], 200);
    }

    // Lấy ra chi tiết giấy phép lái xe
    public function show($id)
    {
        // Lấy ra giấy phép lái xe
        $driver_license = DriverLicenses::where('driver_license_id', $id)
            ->first();

        // Kiểm tra nếu không tìm thấy giấy phép lái xe
        if (!$driver_license) {
            return response()->json(['error' => 'Không tìm thấy giấy phép lái xe với id:'. $id], 404);
        }

        // Trả về thông tin giấy phép lái xe
        return response()->json(['driver_license' => $driver_license], 200);
    }

    // Sửa giấy phép lái xe
    public function update(DriverLicenseRequest $request, $id)
    {
        try {
            // Tìm giấy phép lái xe
            $driverLicense = DriverLicenses::find($id);
            if(!$driverLicense){
                return response()->json(['message', 'không tìm thấy giấy phép lái xe với id:'. $id], 404);
            }

            // Kiểm tra nếu trạng thái chuyển thành 'invalid' thì lý do hủy là bắt buộc
            if ($request->license_status === 'invalid' && empty($request->rejection_reason)) {
                return response()->json(['message' => 'Bạn cần cung cấp lý do hủy (rejection_reason)'], 422);
            }

            // Cập nhật giấy phép lái xe
            $driverLicense->license_type = $request->license_type;
            $driverLicense->license_status = $request->license_status;
            $driverLicense->expiry_date = $request->expiry_date;
            $driverLicense->issued_by = $request->issued_by;

            // Chỉ cập nhật rejection_reason nếu trạng thái là 'invalid'
            if ($request->license_status === 'invalid') {
                $driverLicense->rejection_reason = $request->rejection_reason;
            }

            // Lưu các thay đổi vào database
            $driverLicense->save();

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Sửa giấy phép lái xe thành công', 'driver_licenses' => $driverLicense], 200);
        } catch (\Exception $e) {

            // Trả về phản hồi lỗi nếu có lỗi xảy ra trong quá trình xử lý
            return response()->json(['message' => 'Cập nhật giấy phép lái xe thất bại', 'error' => $e->getMessage()], 500);
        }
    }

}
