<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        // Lấy danh sách các user_id và car_id hợp lệ từ bảng users và car
        $userIds = DB::table('users')->pluck('id')->toArray(); // Sửa từ 'user' thành 'users'
        $carIds = DB::table('car')->pluck('car_id')->toArray();

        // Tạo 5 mục yêu thích giả lập
        for ($i = 0; $i < 5; $i++) {
            DB::table('favorite')->insert([
                'date_favorite' => now()->subDays(rand(0, 30)), // Ngày yêu thích ngẫu nhiên
                'user_id' => Arr::random($userIds), // Chọn user_id ngẫu nhiên
                'car_id' => Arr::random($carIds), // Chọn car_id ngẫu nhiên
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
