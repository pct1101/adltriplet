<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class CarImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lấy danh sách các car_id hợp lệ từ bảng car
        $carIds = DB::table('car')->pluck('car_id')->toArray();

        // Tạo dữ liệu cho car_image
        for ($i = 1; $i <= 20; $i++) {
            DB::table('car_image')->insert([
                [
                    'carImage_url' => 'anh1-x' . $i . '.jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLED Pro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => Arr::random($carIds), // Chọn car_id ngẫu nhiên
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'carImage_url' => 'anh2-x' . $i . '.jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLED Pro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => Arr::random($carIds), // Chọn car_id ngẫu nhiên
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'carImage_url' => 'anh3-x' . $i . '.jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLED Pro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => Arr::random($carIds), // Chọn car_id ngẫu nhiên
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'carImage_url' => 'anh4-x' . $i . '.jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLED Pro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => Arr::random($carIds), // Chọn car_id ngẫu nhiên
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }
}
