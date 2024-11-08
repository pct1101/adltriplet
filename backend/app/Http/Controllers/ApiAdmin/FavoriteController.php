<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Favorite;
use App\Models\User;
use App\Models\Car;

class FavoriteController extends Controller
{
    // Lấy tất cả yêu thích
    public function index()
    {
        $favorites = Favorite::all();
        return response()->json($favorites);
    }
    public function store(Request $request)
    {
        // Kiểm tra xem user_id và car_id có được gửi đến không
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:car,car_id',
        ]);

        // Kiểm tra nếu yêu thích đã tồn tại
        $existingFavorite = Favorite::where('user_id', $request->user_id)
            ->where('car_id', $request->car_id)
            ->first();

        if ($existingFavorite) {
            return response()->json(['message' => 'This car is already in favorites.'], 409); // 409 Conflict
        }

        // Tạo yêu thích mới
        $favorite = Favorite::create([
            'user_id' => $request->user_id,
            'car_id' => $request->car_id,
            'date_favorite' => now(), // Ngày yêu thích
        ]);

        return response()->json(['message' => 'Car added to favorites successfully!', 'favorite' => $favorite], 201);
    }

    public function show($userId, $carId)
    {
        // Tìm yêu thích theo user_id và car_id
        $favorite = Favorite::with(['car', 'user']) // Giả sử bạn đã thiết lập quan hệ 'car' và 'user' trong mô hình Favorite
            ->where('user_id', $userId)
            ->where('car_id', $carId)
            ->first();

        // Kiểm tra xem yêu thích có tồn tại hay không
        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        // Trả về thông tin yêu thích kèm theo thông tin về xe và người dùng
        return response()->json([
            'favorite' => $favorite,
        ], 200);
    }
    public function destroy($id)
    {
        // Tìm yêu thích theo favorite_id
        $favorite = Favorite::find($id);

        // Kiểm tra xem yêu thích có tồn tại hay không
        if (!$favorite) {
            return response()->json(['message' => 'Favorite not found.'], 404);
        }

        // Xóa yêu thích
        $favorite->delete();

        return response()->json(['message' => 'Favorite deleted successfully.'], 200);
    }
}
