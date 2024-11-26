<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use App\Models\DriverLicenses;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Exception;

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
            $driverLicense = DriverLicenses::find($id);
            if(!$driverLicense){
                return response()->json(['message', 'không tìm thấy giấy phép lái xe với id:'. $id], 404);
            }

            // Cập nhật giấy phép lái xe
            $driverLicense->license_number = $request->license_number;
            $driverLicense->license_holder = $request->license_holder;
            $driverLicense->license_type = $request->license_type;
            $driverLicense->license_status = $request->license_status;
            $driverLicense->issue_date = $request->issue_date;
            $driverLicense->expiry_date = $request->expiry_date;
            $driverLicense->issued_by = $request->issued_by;

            // Xử lý ảnh nếu được tải lên
            if ($request->hasFile('license_image')) {
                $storage = Storage::disk('public');

                // Tạo tên file mới
                $licenseImageName = 'license_images/' . 'us_id_' . $driverLicense->user_id . '_lc_img_' . $request->file('license_image')->getClientOriginalName();

                // Lưu ảnh vào thư mục storage/app/public/license_images
                $storage->put($licenseImageName, file_get_contents($request->file('license_image')));

                // Đường dẫn file nguồn (storage/app/public)
                $sourcePath = storage_path('app/public/' . $licenseImageName);

                // Đường dẫn file đích (public/license_images)
                $destinationPath = public_path('license_images/' . basename($licenseImageName));

                // Tạo thư mục public/license_images nếu chưa tồn tại
                if (!File::exists(public_path('license_images'))) {
                    File::makeDirectory(public_path('license_images'), 0755, true);
                }

                // Di chuyển file từ storage sang public
                if (File::exists($sourcePath)) {
                    File::copy($sourcePath, $destinationPath);
                }

                // Xóa ảnh cũ nếu tồn tại
                if (!empty($driverLicense->license_image)) {
                    $oldStoragePath = storage_path('app/public/' . $driverLicense->license_image);
                    $oldPublicPath = public_path('license_images/' . basename($driverLicense->license_image));

                    if (File::exists($oldStoragePath)) {
                        File::delete($oldStoragePath);
                    }

                    if (File::exists($oldPublicPath)) {
                        File::delete($oldPublicPath);
                    }
                }

                // Cập nhật đường dẫn ảnh mới vào database
                $driverLicense->license_image = $licenseImageName;
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
