<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;



class AuthController
{
    public function register(Request $request)
    {
        // In ra dữ liệu nhận được
        Log::info($request->all());

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
    public function login(Request $request)
    {
        // Xác thực đầu vào
        $validator = Validator::make($request->all(), [
            'login' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Kiểm tra nếu có lỗi trong việc xác thực
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tìm người dùng bằng email hoặc số điện thoại
        $user = User::where('email', $request->login)
            ->orWhere('phone', $request->login)
            ->first();

        // Kiểm tra người dùng tồn tại và mật khẩu có đúng không
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }

        // Tạo token cho người dùng
        $token = $user->createToken('auth_token')->plainTextToken;

        // Tạo API token mới
        $apiToken = Str::random(8);

        // Cập nhật api_token vào user
        $user->api_token = $apiToken;
        $user->save();

        // Trả về thông tin người dùng và token
        return response()->json([
            'message' => 'Login successful!',
            'user' => $user,
            'token' => $token,
        ], 200);
    }


    // Lấy thông tin người dùng
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // Cập nhập thông tin người dùng
    public function updateProfile(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $request->user()->id,
            'phone' => 'sometimes|string|max:15|unique:users,phone,' . $request->user()->id,
            'image' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'birth_date' => 'nullable|date',
            'address' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Cập nhật thông tin người dùng
        $user = $request->user();

        // Cập nhật từng trường chỉ nếu nó có trong yêu cầu
        $user->name = $request->input('name', $user->name); // Giữ nguyên nếu không có thay đổi
        $user->email = $request->input('email', $user->email); // Giữ nguyên nếu không có thay đổi
        $user->phone = $request->input('phone', $user->phone); // Giữ nguyên nếu không có thay đổi
        $user->image = $request->input('image', $user->image); // Giữ nguyên nếu không có thay đổi
        $user->gender = $request->input('gender', $user->gender); // Giữ nguyên nếu không có thay đổi
        $user->birth_date = $request->input('birth_date', $user->birth_date); // Giữ nguyên nếu không có thay đổi
        $user->address = $request->input('address', $user->address); // Giữ nguyên nếu không có thay đổi

        // Lưu các thay đổi
        $user->save();

        return response()->json(['message' => 'Profile updated successfully!', 'user' => $user], 200);
    }
    // Thay đổi mật khẩu
    public function changePassword(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Lấy người dùng hiện tại
        $user = $request->user();

        // Kiểm tra mật khẩu hiện tại
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect.'], 403);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully!'], 200);
    }


    // Đăng xuất người dùng
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout successful'], 200);
    }
}
