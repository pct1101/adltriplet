<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra nếu user đã đăng nhập và có role là 1
        if (Auth::check() && Auth::user()->role == 1) {
            return $next($request);
        }

        // Nếu không có quyền truy cập, chuyển hướng hoặc trả về lỗi
        // return redirect('/')->with('error', 'Bạn không có quyền truy cập vào trang này.');

        return response()->json(['error' => 'Unauthorized'], 403);
        ; // hoặc trả về lỗi 403
    }
}

