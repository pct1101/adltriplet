<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class CarBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('carbrand')->insert([
            [
                'brand_name' => 'HYUNDAI',
                'brand_description' => 'Xe Hyundai, dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLEDpro A5 giải trí và đầy đủ các tiện ích cơ bản khác.'
            ],
            [
                'brand_name' => 'TOYOTA',
                'brand_description' => 'Xe TOYOTA, dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLEDpro A5 giải trí và đầy đủ các tiện ích cơ bản khác.'
            ],
            [
                'brand_name' => 'KIA',
                'brand_description' => 'Xe KIA, dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLEDpro A5 giải trí và đầy đủ các tiện ích cơ bản khác.'
            ],
            [
                'brand_name' => 'MITSUBISHI',
                'brand_description' => 'Xe MITSUBISHI, dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLEDpro A5 giải trí và đầy đủ các tiện ích cơ bản khác.'
            ],
            [
                'brand_name' => 'MERCEDES',
                'brand_description' => 'Xe MERCEDES, dòng sedan cốp xe rộng rãi, xe dùng gia đình, ít sử dụng, còn mới, sạch sẽ, VETC tiện lợi, màn hình OLEDpro A5 giải trí và đầy đủ các tiện ích cơ bản khác.'
            ],
        ]);
    }
}
