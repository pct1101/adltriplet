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
        if (Auth::check() && Auth::user()->role == 'admin') {
            return $next($request);
        }
        return response()->json(['error' => 'Unauthorized'], 403);; // hoặc trả về lỗi 403
    }
}
