<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Http\Requests\BannerRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class BannerController extends Controller
{
    // Lấy danh sách tất cả các banner
    public function index()
    {
        try {
            $banners = Banner::all();
            return $this->successResponse("Lấy danh sách banner thành công", $banners, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    // Lấy thông tin chi tiết một banner
    public function show($id)
    {
        try {
            $banner = Banner::find($id);
            if (!$banner) {
                return $this->errorResponse("Không tìm thấy banner với ID: $id", 404);
            }
            return $this->successResponse("Lấy thông tin banner với ID: $id thành công", $banner, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }



    // Tạo banner mới
    public function store(Request $request)
    {
        try {
            $bannerRequest = new BannerRequest($request->all());
            $validatedData = $bannerRequest->validate();
            $banner = Banner::create($validatedData);
            return $this->successResponse("Tạo banner thành công", $banner, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }




    // Cập nhật banner
    public function update(Request $request, $id)
    {
        try {
            $banner = Banner::findOrFail($id);
            $bannerRequest = new BannerRequest($request->all());
            $validatedData = $bannerRequest->validate();
            $banner->update($validatedData);
            return $this->successResponse("Cập nhật banner với ID: $id thành công", $banner, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy banner với ID: $id", 404);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }


    // Xóa banner
    public function destroy($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            $banner->delete();
            return $this->successResponse("Xóa banner thành công", null, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy banner với ID: $id", 404);
        } catch (Exception $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }
}
