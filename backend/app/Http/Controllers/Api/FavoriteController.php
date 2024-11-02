<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\Favorite;
use App\Models\User;
use App\Models\Car;

class FavoriteController extends Controller
{
    // Lấy danh sách yêu thích của người dùng
    public function index()
    {
        $userId = Auth::id();
        $favorites = Favorite::where('user_id', $userId)->with('car')->get(); // Lấy danh sách yêu thích cùng với thông tin xe

        return response()->json($favorites);
    }

    // Chi tiết yêu thích
    public function show($id)
    {
        // Tìm yêu thích theo car_id và user_id
        $favorite = Favorite::with('car') // Tải thông tin xe liên quan
            ->where('car_id', $id)
            ->where('user_id', Auth::id()) // Chỉ cho phép người dùng xem yêu thích của chính họ
            ->first();

        // Kiểm tra xem yêu thích có tồn tại hay không
        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        // Trả về thông tin yêu thích cùng với thông tin xe
        return response()->json(['favorite' => $favorite], 200);
    }



    // Thêm xe vào danh sách yêu thích
    public function store(Request $request, $id)
    {
        // Kiểm tra xem xe có tồn tại không
        $car = Car::find($id);
        if (!$car) {
            return response()->json(['message' => 'Car not found.'], 404);
        }

        // Kiểm tra xem người dùng đã yêu thích xe này chưa
        $existingFavorite = Favorite::where('user_id', Auth::id())->where('car_id', $id)->first();
        if ($existingFavorite) {
            return response()->json(['message' => 'Car is already in favorites.'], 409);
        }

        // Tạo mới một yêu thích
        $favorite = Favorite::create([
            'user_id' => Auth::id(),
            'car_id' => $id,
            'date_favorite' => now(), // Ngày yêu thích
        ]);

        return response()->json(['message' => 'Car added to favorites successfully!', 'favorite' => $favorite], 201);
    }
    // Xóa yêu thích
    public function destroy($id)
    {
        // Tìm yêu thích theo car_id và user_id
        $favorite = Favorite::where('car_id', $id)
            ->where('user_id', Auth::id()) // Chỉ người tạo mới có quyền xóa
            ->first();

        // Kiểm tra xem yêu thích có tồn tại hay không
        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        // Xóa yêu thích
        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully.'], 200);
    }
}
