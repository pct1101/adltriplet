<?php

namespace App\Http\Controllers\ApiAdmin;

use Exception;
use App\Models\CarBrand;
use App\Http\Requests\CarBrandRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class CarBrandController extends Controller
{
    // Lấy tất cả các thương hiệu xe
    public function index()
    {
        try {
            $brands = CarBrand::all();
            if ($brands->isEmpty()) {
                return $this->errorResponse("Không có thương hiệu xe nào", 404);
            }
            return $this->successResponse("Lấy danh sách thương hiệu xe", $brands, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    // Hiển thị chi tiết một thương hiệu xe
    public function show($id)
    {
        try {
            $brand = CarBrand::find($id);
            if (!$brand) {
                return $this->errorResponse("Không tìm thấy thương hiệu xe với ID: $id", 404);
            }
            return $this->successResponse("Lấy chi tiết thương hiệu xe với ID: $id thành công", $brand, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    // Tạo một thương hiệu xe mới
    public function store(Request $request)
    {
        try {
            $brandRequest = new CarBrandRequest($request->all());
            $validatedData = $brandRequest->validate();
            $brand = CarBrand::create($validatedData);
            return $this->successResponse("Tạo thương hiệu xe mới", $brand, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }


    // Cập nhật thông tin thương hiệu xe
    public function update(Request $request, $id)
    {
        try {
            $brand = CarBrand::findOrFail($id);
            $brandRequest = new CarBrandRequest($request->all(), $id);
            $validatedData = $brandRequest->validate();
            $brand->update($validatedData);
            return $this->successResponse("Cập nhật thương hiệu xe với ID: $id thành công", $brand, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy thương hiệu xe với ID: $id", 404);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }


    // Xóa một thương hiệu xe
    public function destroy($id)
    {
        try {
            $brand = CarBrand::findOrFail($id);
            $brand->delete();
            return $this->successResponse("Xóa thương hiệu xe với ID: $id", null, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy thương hiệu xe với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
