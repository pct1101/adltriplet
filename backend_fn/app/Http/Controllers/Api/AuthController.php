<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;

class AuthController
{
    /**
     * Update an existing users.
     *
     * @param UserRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function register(UserRequest $request)
    {
        // Tạo token kích hoạt ngẫu nhiên
        $activation_token = Str::random(8);

        try {
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
                'activation_token' => $activation_token,
            ]);

            // Kiểm tra nếu user không được tạo
            if (!$user) {
                return response()->json(['message' => 'Không thể tạo người dùng'], 500);
            }

            return response()->json(['message' => 'Đăng ký thành công.', 'user' => $user], 201);
        } catch (\Exception $e) {
            // Log lỗi và trả về thông báo lỗi
            Log::error("Lỗi khi tạo người dùng: " . $e->getMessage());
            return response()->json(['message' => 'Có lỗi xảy ra trong quá trình đăng ký'], 500);
        }
    }

    public function login(Request $request)
    {
        // Tìm người dùng bằng email hoặc số điện thoại
        $user = User::where('email', $request->login)
            ->orWhere('phone', $request->login)
            ->first();

        // Kiểm tra người dùng tồn tại, mật khẩu đúng và status = 1
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
    // public function updateProfile(Request $request)
    // {
    //     // Xác thực dữ liệu đầu vào
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'sometimes|string|max:255',
    //         'email' => 'sometimes|string|email|max:255|unique:users,email,' . $request->user()->id,
    //         'phone' => 'sometimes|string|max:15|unique:users,phone,' . $request->user()->id,
    //         'image' => 'nullable|string',
    //         'gender' => 'nullable|in:male,female,other',
    //         'birth_date' => 'nullable|date',
    //         'address' => 'nullable|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }

    //     // Cập nhật thông tin người dùng
    //     $user = $request->user();

    //     // Cập nhật từng trường chỉ nếu nó có trong yêu cầu
    //     $user->name = $request->input('name', $user->name); // Giữ nguyên nếu không có thay đổi
    //     $user->email = $request->input('email', $user->email); // Giữ nguyên nếu không có thay đổi
    //     $user->phone = $request->input('phone', $user->phone); // Giữ nguyên nếu không có thay đổi
    //     $user->image = $request->input('image', $user->image); // Giữ nguyên nếu không có thay đổi
    //     $user->gender = $request->input('gender', $user->gender); // Giữ nguyên nếu không có thay đổi
    //     $user->birth_date = $request->input('birth_date', $user->birth_date); // Giữ nguyên nếu không có thay đổi
    //     $user->address = $request->input('address', $user->address); // Giữ nguyên nếu không có thay đổi

    //     // Lưu các thay đổi
    //     $user->save();

    //     return response()->json(['message' => 'Profile updated successfully!', 'user' => $user], 200);
    // }

    public function update(UserRequest $request)
    {
        try {
            $user_id = Auth::id();
            $user = $request->user(); // Lấy người dùng hiện tại
            $storage = Storage::disk('public');

            // Xử lý ảnh nếu được tải lên
            if ($request->hasFile('image')) {
                $storage = Storage::disk('public');

                // Tạo tên file mới
                $userImageName = 'user_images/' . 'us_id_' . $user_id . '_img_' . $request->file('image')->getClientOriginalName();

                // Lưu ảnh vào thư mục storage/app/public/user_images
                $storage->put($userImageName, file_get_contents($request->file('image')));

                // Đường dẫn file nguồn (storage/app/public)
                $sourcePath = storage_path('app/public/' . $userImageName);

                // Đường dẫn file đích (public/user_images)
                $destinationPath = public_path('user_images/' . basename($userImageName));

                // Tạo thư mục public/user_images nếu chưa tồn tại
                if (!File::exists(public_path('user_images'))) {
                    File::makeDirectory(public_path('user_images'), 0755, true);
                }

                // Di chuyển file từ storage sang public
                if (File::exists($sourcePath)) {
                    File::copy($sourcePath, $destinationPath);
                }

                // Xóa ảnh cũ nếu tồn tại
                if (!empty($user->image)) {
                    $oldStoragePath = storage_path('app/public/' . $user->image);
                    $oldPublicPath = public_path('user_images/' . basename($user->image));

                    if (File::exists($oldStoragePath)) {
                        File::delete($oldStoragePath);
                    }

                    if (File::exists($oldPublicPath)) {
                        File::delete($oldPublicPath);
                    }
                }

                // Cập nhật đường dẫn ảnh mới vào database
                $user->image = $userImageName;
            }

            // Cập nhật các thông tin khác
            $user->name = $request->input('name', $user->name);
            $user->phone = $request->input('phone', $user->phone);
            $user->gender = $request->input('gender', $user->gender);
            $user->birth_date = $request->input('birth_date', $user->birth_date);
            $user->address = $request->input('address', $user->address);
            $user->role = $request->input('role', $user->role);

            // Lưu các thay đổi
            $user->save();

            return response()->json(['message' => 'Cập nhật hồ sơ thành công!', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Cập nhật thất bại', 'message' => $e->getMessage()], 500);
        }
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
