<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\CarBrand;
use Illuminate\Http\Request;

class CarBrandController extends Controller
{
    // Lấy tất cả các thương hiệu xe
    public function index()
    {
        $brands = CarBrand::all();
        return response()->json($brands);
    }

    // Hiển thị chi tiết một thương hiệu xe
    public function show($id)
    {
        $brand = CarBrand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        return response()->json($brand);
    }

    // Tạo một thương hiệu xe mới
    public function store(Request $request)
    {
        $request->validate([
            'brand_name' => 'required|string|max:255',
            'brand_description' => 'nullable|string',
        ]);

        $brand = CarBrand::create($request->all());

        return response()->json(['message' => 'Brand created successfully', 'brand' => $brand], 201);
    }

    // Cập nhật thông tin thương hiệu xe
    public function update(Request $request, $id)
    {
        // Tìm thương hiệu theo brand_id
        $brand = CarBrand::find($id);

        // Kiểm tra xem thương hiệu có tồn tại không
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        // Xác thực đầu vào
        $request->validate([
            'brand_name' => 'sometimes|required|string|max:255',
            'brand_description' => 'nullable|string',
        ]);

        // Cập nhật thông tin thương hiệu, giữ nguyên giá trị cũ nếu không có thay đổi
        $brand->brand_name = $request->brand_name ?? $brand->brand_name;
        $brand->brand_description = $request->brand_description ?? $brand->brand_description;

        // Lưu lại thông tin đã cập nhật
        $brand->save();

        return response()->json(['message' => 'Brand updated successfully', 'brand' => $brand]);
    }


    // Xóa một thương hiệu xe
    public function destroy($id)
    {
        $brand = CarBrand::find($id);

        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        $brand->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
}