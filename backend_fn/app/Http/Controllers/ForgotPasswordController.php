<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    // Gửi link reset password
    public function sendResetLink(Request $request)
{
    // Validate email
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Lấy người dùng theo email
    $user = \App\Models\User::where('email', $request->email)->first();

    // Tạo token và thời gian hết hạn
    $token = bin2hex(random_bytes(32));
    $expiresAt = now()->addMinutes(60);

    // Lưu token vào bảng users
    $user->update([
        'reset_password_token' => $token,
        'reset_password_expires_at' => $expiresAt,
    ]);

    // Tạo URL reset password
    $resetUrl = url("http://localhost:3000/reset-password?token={$token}&email={$user->email}");

    // Gửi email với đường dẫn reset password
    Mail::raw("Nhấp vào liên kết bên dưới để đặt lại mật khẩu của bạn: \n\n{$resetUrl}", function ($message) use ($user) {
        $message->to($user->email)
                ->subject('Password Reset Request');
    });

    return response()->json([
        'message' => 'Link đặt lại mật khẩu đã được gửi tới email của bạn.',
    ]);
}



    // Đặt lại mật khẩu
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Lấy người dùng theo email và token
        $user = \App\Models\User::where('email', $request->email)
            ->where('reset_password_expires_at', '>=', now())
            ->first();

        if (!$user) {
            return response()->json(['message' => 'Mã thông báo không hợp lệ hoặc mã thông báo đã hết hạn.'], 400);
        }

        // Cập nhật mật khẩu và xóa token
        $user->update([
            'password' => Hash::make($request->password),
            'reset_password_token' => null,
            'reset_password_expires_at' => null,
        ]);

        return response()->json(['message' => 'Mật khẩu của bạn đã được thay đổi.']);
    }
}
