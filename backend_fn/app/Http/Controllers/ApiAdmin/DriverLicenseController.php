<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use App\Models\DriverLicenses;
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

    // Lấy danh dách tất cả các giấy phép lái xe
    public function index()
    {
        // Lấy ra tất cả giấy phép lái xe
        $driver_licenses = DriverLicenses::all();

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
            $driver_license = DriverLicenses::find($id);
            if(!$driver_license){
                return response()->json(['message', 'không tìm thấy giấy phép lái xe với id:'. $id], 404);
            }

            // Cập nhật giấy phép lái xe
            $driver_license->license_number = $request->license_number;
            $driver_license->license_holder = $request->license_holder;
            $driver_license->license_type = $request->license_type;
            $driver_license->license_status = $request->license_status;
            $driver_license->issue_date = $request->issue_date;
            $driver_license->expiry_date = $request->expiry_date;
            $driver_license->issued_by = $request->issued_by;

            // Sử dụng Storage với disk 'public' để lưu ảnh
            $storage = Storage::disk('public');

            // Kiểm tra và xử lý cập nhật hình ảnh (nếu có)
            if ($request->hasFile('license_image_front') && $request->hasFile('license_image_back')) {
                $frontImageContent = file_get_contents($request->file('license_image_front')->getRealPath());
                $backImageContent = file_get_contents($request->file('license_image_back')->getRealPath());

                // Kiểm tra nội dung hai file ảnh
                if(md5($frontImageContent) === md5($backImageContent)){
                    return response()->json(['message' => 'Hai hình ảnh giấy phép lái xe không được trùng nhau'], 400);
                }

                // Xử lý hình ảnh mặt trước
                if($request->hasFile('license_image_front')){
                    if($storage->exists($driver_license->license_image_front)){
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
        } catch (\Exception $e) {

            // Trả về phản hồi lỗi nếu có lỗi xảy ra trong quá trình xử lý
            return response()->json(['message' => 'Cập nhật giấy phép lái xe thất bại', 'error' => $e->getMessage()], 500);
        }
    }

}
