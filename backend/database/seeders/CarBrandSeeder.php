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
                'brand_name' => 'Baic',
                'brand_logo' => 'Baic.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Chevrolet',
                'brand_logo' => 'Chevrolet.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Ford',
                'brand_logo' => 'Ford.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Hyundai',
                'brand_logo' => 'Hyundai.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Kia',
                'brand_logo' => 'Kia.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Lexus',
                'brand_logo' => 'Lexus.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Mercedes',
                'brand_logo' => 'Mercedes.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Morris Garages',
                'brand_logo' => 'Morris-Garages.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Peugeot',
                'brand_logo' => 'Peugeot.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Subaru',
                'brand_logo' => 'Subaru.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Toyota',
                'brand_logo' => 'Toyota.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Volkswagen',
                'brand_logo' => 'Volkswagen.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Audi',
                'brand_logo' => 'Audi.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'BMW',
                'brand_logo' => 'BMW.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Daewoo',
                'brand_logo' => 'Daewoo.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Honda',
                'brand_logo' => 'Honda.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Isuzu',
                'brand_logo' => 'Isuzu.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Land Rover',
                'brand_logo' => 'Land-Rover.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Mazda',
                'brand_logo' => 'Mazda.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Mitsuubishi',
                'brand_logo' => 'Mitsubishi.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Nissan',
                'brand_logo' => 'Nissan.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Renault',
                'brand_logo' => 'Renault.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Suzuki',
                'brand_logo' => 'Suzuki.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Vinfast',
                'brand_logo' => 'Vinfast.png',
                'brand_description' => ''
            ],
            [
                'brand_name' => 'Zotye',
                'brand_logo' => 'Zotye.png',
                'brand_description' => ''
            ],
        ]);
    }
}
