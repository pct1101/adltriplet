<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DriverLicenseRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\DriverLicenses;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

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
        $driverLicenses = DriverLicenses::where('user_id', $user_id)->get();

        // Kiểm tra xem người dùng có giấy phép lái xe nào không
        if ($driverLicenses->isEmpty()) {
            return response(['message' => 'Không tìm thấy giấy phép lái xe nào cho người dùng này'], 404);
        }

        // Trả về danh sách giấy phép lái xe
        return response()->json(['driver_licenses' => $driverLicenses], 200);
    }

    // Lấy ra chi tiết một giấy phép lái xe của người dùng đang đăng nhập
    public function show($id)
    {
        // Lấy ra tất cả giấy phép lái xe của người dùng theo user_id
        $driverLicense = DriverLicenses::where('driver_license_id', $id)->first();

        // Kiểm tra nếu không tìm thấy
        if (!$driverLicense) {
            return response()->json(['message' => 'Không tìm thấy giấy phép lái xe với id: ' . $id], 404);
        }

        // Trả về danh sách giấy phép lái xe
        return response()->json(['driver_licenses' => $driverLicense], 200);
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

                // Lưu ảnh vào thư mục license_images trong storage/app/public
                $licenseImageName = 'license_images/' . 'us_id_' . $user_id . '_lc_img_' . now('Asia/Ho_Chi_Minh')->format('Y-m-d_H-i-s') . '.' . $request->file('license_image')->getClientOriginalExtension();
                $storage->put($licenseImageName, file_get_contents($request->file('license_image')));

                // Đường dẫn file nguồn (storage/app/public)
                $sourcePath = storage_path('app/public/' . $licenseImageName);

                // Đường dẫn file đích (public/license_images)
                $destinationPath = public_path('license_images/' . basename($licenseImageName));

                // Tạo thư mục public/license_images nếu chưa tồn tại
                if (!File::exists(public_path('license_images'))) {
                    File::makeDirectory(public_path('license_images'), 0755, true);
                }

                // Di chuyển file
                if (File::exists($sourcePath)) {
                    File::copy($sourcePath, $destinationPath);
                }
            } catch (Exception $e) {
                return response()->json(['error' => 'Lỗi khi xử lý file ảnh', 'details' => $e->getMessage()], 500);
            }

            // Lưu thông tin giấy phép vào cơ sở dữ liệu
            try {
                $driverLicense = DriverLicenses::create([
                    'user_id' => $user_id,
                    'license_number' => $license_number,
                    'license_holder' => $license_holder,
                    'license_image' => $licenseImageName,
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Lỗi không xác định xảy ra khi lưu giấy phép', 'details' => $e->getMessage(),], 500);
            }

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Thêm giấy phép lái xe thành công', 'driver_licenses' => $driverLicense], 201);
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
            $driverLicense = DriverLicenses::where('user_id', $user_id)->where('driver_license_id', $id)->first();
            if (!$driverLicense) {
                return response()->json(['message' => 'Không tìm thấy giấy phép lái xe với ID: ' . $id], 404);
            }

            // Cập nhật thông tin cơ bản
            $driverLicense->license_number = $request->license_number;
            $driverLicense->license_holder = $request->license_holder;

            // Xử lý ảnh nếu được tải lên
            if ($request->hasFile('license_image')) {
                $storage = Storage::disk('public');

                // Tạo tên file mới
                $licenseImageName = 'license_images/' . 'us_id_' . $user_id . '_lc_img_' . now('Asia/Ho_Chi_Minh')->format('Y-m-d_H-i-s') . '.' . $request->file('license_image')->getClientOriginalName();

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

            return response()->json(['message' => 'Cập nhật giấy phép lái xe thành công.', 'driver_license' => $driverLicense,], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi trong quá trình cập nhật.', 'error' => $e->getMessage(),], 500);
        }
    }
}
