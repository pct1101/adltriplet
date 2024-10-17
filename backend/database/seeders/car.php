<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;


class car extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('carbrand')->insert([
            ['brand_name' => 'HYUNDAI', 'brand_description' => 'Xe Hyundai, dòng sedan cốp xe rộng rãi,  xe dùng gia đình, 
            ít sử sụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và  đầy đủ các tiện ích cơ bản khác'],
            ['brand_name' => 'TOYOTA', 'brand_description' => 'Xe TOYOTA, dòng sedan cốp xe rộng rãi,  xe dùng gia đình, 
            ít sử sụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và  đầy đủ các tiện ích cơ bản khác'],
            ['brand_name' => 'KIA', 'brand_description' => 'Xe KIA, dòng sedan cốp xe rộng rãi,  xe dùng gia đình, 
            ít sử sụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và  đầy đủ các tiện ích cơ bản khác'],
            ['brand_name' => 'MITSUBISHI', 'brand_description' => 'Xe MITSUBISHI, dòng sedan cốp xe rộng rãi,  xe dùng gia đình, 
            ít sử sụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và  đầy đủ các tiện ích cơ bản khác'],
            ['brand_name' => 'MERCEDES', 'brand_description' => 'Xe MERCEDES, dòng sedan cốp xe rộng rãi,  xe dùng gia đình, 
            ít sử sụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và  đầy đủ các tiện ích cơ bản khác'],
        ]);

        $name_brand = ['HYUNDAI', 'TOYOTA', 'KIA', 'MITSUBISHI', 'MERCEDES'];
        $name_hyundai = ['HYUNDAI GRAND I', 'HYUNDAI GALAXY S'];
        $name_toyota = ['TOYOTA CAMRY', 'TOYOTA COROLLA ALTIS', 'TOYOTA VIOS', 'TOYOTA YARIS', 'TOYOTA RAIZE'];
        $name_kia = ['KIA MORNING', 'KIA AFTERNOON', 'KIA EVERNING', 'KIA K'];
        $name_mitsubishi = ['MITSUBISHI XFOCRE', 'MITSUBISHI XBANNER', 'MITSUBISHI OUTDOR', 'MITSUBISHI TRIPLET'];
        $name_mercedes = ['MERCEDES CLASS', 'MERCEDES BENZ E'];
        $model = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
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
                    'car_image' => 'xe1-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'brandid' => 1
                ],
                [
                    'car_name' => Arr::random($name_toyota) . ' ' . $i,  
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),  // Dùng `mt_rand` cho biển số
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'xe2-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'brandid' => 2
                ],
                [
                    'car_name' => Arr::random($name_kia) . ' ' . $i,  
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'xe3-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'brandid' => 3
                ],
                [
                    'car_name' => Arr::random($name_mitsubishi) . ' ' . $i,  
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99), 
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'xe4-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'brandid' => 4
                ],
                [
                    'car_name' => Arr::random($name_mercedes) . ' ' . $i, 
                    'seats' => Arr::random($seats),
                    'model' => Arr::random($model),
                    'license_plate' => '51A-' . mt_rand(100, 999) . '.' . mt_rand(10, 99),
                    'rental_price' => mt_rand(1000, 8000) * 1000,
                    'mileage' => mt_rand(10000, 60000),
                    'car_image' => 'xe5-' . $i . '-anhchinh.jpg',
                    'car_description' => 'Xe dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình oledpro A5 giải trí và đầy đủ các tiện ích cơ bản khác',
                    'brandid' => 5
                ]
            ]);
            
        }
    }
}
