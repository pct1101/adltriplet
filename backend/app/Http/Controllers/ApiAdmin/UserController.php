<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class UserController extends Controller
{

    public function index()
    {
        $user = User::all();
        return response()->json($user);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    public function store(Request $request)
    {
        // Xác thực đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string|max:15|unique:users', // Đảm bảo phone là duy nhất
            'image' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'birth_date' => 'nullable|date',
            'address' => 'nullable|string',
        ]);

        // Kiểm tra nếu có lỗi trong việc xác thực
        if ($validator->fails()) {
            // Lấy lỗi và thông báo
            $errors = $validator->errors();

            // Thông báo riêng biệt nếu có lỗi liên quan đến email hoặc phone
            if ($errors->has('email')) {
                return response()->json(['message' => 'Email has already been taken.'], 422);
            }

            if ($errors->has('phone')) {
                return response()->json(['message' => 'Phone has already been taken.'], 422);
            }

            // Nếu có lỗi khác, trả về lỗi chung
            return response()->json($errors, 422);
        }

        // Tạo người dùng mới
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'image' => $request->image,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'address' => $request->address,
        ]);

        // Trả về thông báo thành công
        return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,  // Bỏ qua email hiện tại
            'phone' => 'sometimes|string|max:15|unique:users,phone,' . $user->id,  // Bỏ qua phone hiện tại
            'password' => 'sometimes|string|min:6',
            'image' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'birth_date' => 'nullable|date',
            'address' => 'nullable|string',
            'role' => 'sometimes|in:user,admin',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Cập nhật thông tin người dùng
        $user->update($request->all());

        return response()->json(['message' => 'User updated successfully!', 'user' => $user], 200);
    }


    public function destroy($id)
    {
        // Tìm người dùng theo ID
        $user = User::find($id);

        // Kiểm tra xem người dùng có tồn tại không
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Xóa người dùng
        $user->delete();

        // Trả về phản hồi thành công
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
