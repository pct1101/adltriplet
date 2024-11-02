<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    // Lấy danh sách tất cả các banner
    public function index()
    {
        $banners = Banner::all();
        return response()->json($banners);
    }

    // Tạo banner mới
    public function store(Request $request)
    {
        // Xác thực dữ liệu
        $request->validate([
            'banner_url' => 'required|string|max:255',
            'banner_status' => 'boolean',
        ]);

        // Tạo mới banner
        $banner = Banner::create([
            'banner_url' => $request->banner_url,
            'banner_status' => $request->banner_status ?? 1, // Mặc định là 1
        ]);

        return response()->json(['message' => 'Banner created successfully', 'banner' => $banner], 201);
    }

    // Lấy thông tin chi tiết một banner
    public function show($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        return response()->json($banner);
    }

    // Cập nhật banner
    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        // Xác thực dữ liệu
        $request->validate([
            'banner_url' => 'sometimes|required|string|max:255',
            'banner_status' => 'boolean',
        ]);

        // Cập nhật thông tin, giữ nguyên giá trị cũ nếu không có thay đổi
        $banner->banner_url = $request->banner_url ?? $banner->banner_url;
        $banner->banner_status = $request->banner_status ?? $banner->banner_status;

        // Lưu lại thông tin
        $banner->save();

        return response()->json(['message' => 'Banner updated successfully', 'banner' => $banner]);
    }

    // Xóa banner
    public function destroy($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $banner->delete();

        return response()->json(['message' => 'Banner deleted successfully']);
    }
}