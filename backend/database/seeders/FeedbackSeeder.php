<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy danh sách các user_id và car_id hợp lệ từ bảng users và car
        $userIds = DB::table('users')->pluck('id')->toArray();
        $carIds = DB::table('car')->pluck('car_id')->toArray();

        // Các nội dung phản hồi và đánh giá giả lập
        $contents = [
            'Xe chất lượng tốt',
            'Xe sạch sẽ thoáng mát',
            'Cần thêm những dịch vụ này',
            'Tuyệt',
            'OK',
        ];

        $ratings = ['5', '4', '3', '2', '1'];

        // Tạo 5 phản hồi giả lập
        for ($i = 0; $i < 5; $i++) {
            DB::table('feedback')->insert([
                'content' => Arr::random($contents), // Chọn nội dung phản hồi ngẫu nhiên
                'rating' => Arr::random($ratings), // Chọn đánh giá ngẫu nhiên
                'feedback_date' => now()->subDays(rand(0, 30)), // Ngày phản hồi ngẫu nhiên
                'user_id' => Arr::random($userIds), // Chọn user_id ngẫu nhiên
                'car_id' => Arr::random($carIds), // Chọn car_id ngẫu nhiên
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
