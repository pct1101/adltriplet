<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $name_hyundai = ['HYUNDAI GRAND I', 'HYUNDAI GALAXY S'];
        $name_toyota = ['TOYOTA CAMRY', 'TOYOTA COROLLA ALTIS', 'TOYOTA VIOS', 'TOYOTA YARIS', 'TOYOTA RAIZE'];
        $name_kia = ['KIA MORNING', 'KIA AFTERNOON', 'KIA EVENING', 'KIA K'];
        $name_mitsubishi = ['MITSUBISHI XFOCRE', 'MITSUBISHI XBANNER', 'MITSUBISHI OUTDOR', 'MITSUBISHI TRIPLET'];
        $name_mercedes = ['MERCEDES CLASS', 'MERCEDES BENZ E'];
        $model = range(2010, 2023);
        $seats = [4, 7, 16];

        for ($i = 1; $i <= 20; $i++) {
            DB::table('car')->insert([
                [
                    'car_name' => Arr::random($name_hyundai) . ' ' . $i,
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'hyundai-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ.',
                    'brandid' => 1 // ID thương hiệu HYUNDAI
                ],
                [
                    'car_name' => Arr::random($name_toyota) . ' ' . $i,
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'toyota-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ.',
                    'brandid' => 2 // ID thương hiệu TOYOTA
                ],
                [
                    'car_name' => Arr::random($name_kia) . ' ' . $i,
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'kia-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ.',
                    'brandid' => 3 // ID thương hiệu KIA
                ],
                [
                    'car_name' => Arr::random($name_mitsubishi) . ' ' . $i,
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'mitsubishi-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ.',
                    'brandid' => 4 // ID thương hiệu MITSUBISHI
                ],
                [
                    'car_name' => Arr::random($name_mercedes) . ' ' . $i,
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'mercedes-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ.',
                    'brandid' => 5 // ID thương hiệu MERCEDES
                ]
            ]);
        }
    }
}
