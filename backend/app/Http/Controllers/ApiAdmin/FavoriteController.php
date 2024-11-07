<?php

namespace App\Http\Controllers\ApiAdmin;

use Exception;
use App\Models\Favorite;
use App\Http\Requests\FavoriteRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FavoriteController extends Controller
{
    // Lấy tất cả yêu thích
    public function index()
    {
        try {
            $favorites = Favorite::all();
            if ($favorites->isEmpty()) {
                return $this->errorResponse("Không có yêu thích nào", 404);
            }
            return $this->successResponse("Lấy danh sách yêu thích thành công", $favorites, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    public function show($userId, $carId)
    {
        try {
            $favorite = Favorite::with(['car', 'user'])
                ->where('user_id', $userId)
                ->where('car_id', $carId)
                ->first();
            if (!$favorite) {
                return $this->errorResponse('Yêu thích không tồn tại.', 404);
            }
            return $this->successResponse('Lấy thông tin yêu thích thành công', [
                'favorite' => $favorite,
            ], 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }


    public function store(Request $request)
    {
        try {
            $favoriteRequest = new FavoriteRequest($request->all());
            $validatedData = $favoriteRequest->validate();
            if ($validatedData instanceof Favorite) {
                return $this->errorResponse('Xe đã được yêu thích bởi người dùng này.', 400);
            }
            $favorite = Favorite::create($validatedData);
            return $this->successResponse("Thêm xe với ID xe: $favorite->car_id vào ID người dùng: $favorite->user_id thành công", $favorite, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        try {
            $favorite = Favorite::findOrFail($id);
            $favorite->delete();
            return $this->successResponse("Xóa yêu thích công xe với ID: $id", null, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy yêu thích với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
