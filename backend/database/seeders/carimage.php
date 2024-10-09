<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
class carimage extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            DB::table('carimage')->insert([
                [
                    'carImage_url' => 'anh1-x' . $i . 'jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => $i
                ],
                [
                    'carImage_url' => 'anh2-x' . $i . 'jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => $i
                ],
                [
                    'carImage_url' => 'anh3-x' . $i . 'jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => $i
                ],
                [
                    'carImage_url' => 'anh4-x' . $i . 'jpg',
                    'carImage_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'car_id' => $i
                ],
            ]);
        }
    }
}