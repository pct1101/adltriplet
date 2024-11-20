<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleCors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000') // Thay localhost:3000 bằng URL frontend của bạn
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Các phương thức HTTP cho phép
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization'); // Các header cho phép
    }
}
