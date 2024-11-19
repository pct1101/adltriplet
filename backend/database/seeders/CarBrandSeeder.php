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
                'brand_description' => 'Baic là hãng xe của Trung Quốc, nổi bật với các mẫu xe giá rẻ và các dòng xe điện thân thiện với môi trường.'
            ],
            [
                'brand_name' => 'Chevrolet',
                'brand_logo' => 'Chevrolet.png',
                'brand_description' => 'Chevrolet, thuộc tập đoàn General Motors, nổi tiếng với các dòng xe đa dụng, bán tải và xe điện.'
            ],
            [
                'brand_name' => 'Ford',
                'brand_logo' => 'Ford.png',
                'brand_description' => 'Ford là hãng xe Mỹ lâu đời, nổi bật với các dòng xe bán tải, SUV, và xe thể thao như Ford Mustang.'
            ],
            [
                'brand_name' => 'Hyundai',
                'brand_logo' => 'Hyundai.png',
                'brand_description' => 'Hyundai là hãng xe lớn của Hàn Quốc, nổi tiếng với các dòng xe có chất lượng cao và giá cả hợp lý.'
            ],
            [
                'brand_name' => 'Kia',
                'brand_logo' => 'Kia.png',
                'brand_description' => 'Kia thuộc tập đoàn Hyundai, nổi bật với thiết kế hiện đại và công nghệ tiên tiến, phù hợp với thị trường châu Á.'
            ],
            [
                'brand_name' => 'Lexus',
                'brand_logo' => 'Lexus.png',
                'brand_description' => 'Lexus là thương hiệu xe sang của Toyota, nổi tiếng với độ bền bỉ, tính năng sang trọng và hiệu suất cao.'
            ],
            [
                'brand_name' => 'Mercedes',
                'brand_logo' => 'Mercedes.png',
                'brand_description' => 'Mercedes-Benz là hãng xe Đức cao cấp, nổi tiếng với thiết kế sang trọng và công nghệ tiên tiến.'
            ],
            [
                'brand_name' => 'Morris Garages',
                'brand_logo' => 'Morris-Garages.png',
                'brand_description' => 'Morris Garages (MG) là thương hiệu Anh Quốc lâu đời, nay thuộc tập đoàn SAIC của Trung Quốc, nổi tiếng với xe SUV và xe điện.'
            ],
            [
                'brand_name' => 'Peugeot',
                'brand_logo' => 'Peugeot.png',
                'brand_description' => 'Peugeot là thương hiệu xe hơi Pháp, nổi bật với thiết kế tinh tế và trải nghiệm lái êm ái.'
            ],
            [
                'brand_name' => 'Subaru',
                'brand_logo' => 'Subaru.png',
                'brand_description' => 'Subaru là hãng xe Nhật nổi tiếng với hệ dẫn động 4 bánh và động cơ Boxer đặc trưng.'
            ],
            [
                'brand_name' => 'Toyota',
                'brand_logo' => 'Toyota.png',
                'brand_description' => 'Toyota là thương hiệu xe Nhật nổi tiếng toàn cầu, với các dòng xe bền bỉ và tiết kiệm nhiên liệu.'
            ],
            [
                'brand_name' => 'Volkswagen',
                'brand_logo' => 'Volkswagen.png',
                'brand_description' => 'Volkswagen là hãng xe Đức, nổi bật với thiết kế hiện đại, bền bỉ và công nghệ tiên tiến.'
            ],
            [
                'brand_name' => 'Audi',
                'brand_logo' => 'Audi.png',
                'brand_description' => 'Audi là thương hiệu xe sang của Đức, nổi tiếng với thiết kế sang trọng và công nghệ hiện đại.'
            ],
            [
                'brand_name' => 'BMW',
                'brand_logo' => 'BMW.png',
                'brand_description' => 'BMW là hãng xe Đức, nổi tiếng với các mẫu xe thể thao và hiệu suất cao.'
            ],
            [
                'brand_name' => 'Daewoo',
                'brand_logo' => 'Daewoo.png',
                'brand_description' => 'Daewoo là hãng xe Hàn Quốc, nổi bật với các mẫu xe giá rẻ trước khi bị sáp nhập vào GM.'
            ],
            [
                'brand_name' => 'Honda',
                'brand_logo' => 'Honda.png',
                'brand_description' => 'Honda là hãng xe Nhật nổi tiếng với độ bền bỉ và động cơ tiết kiệm nhiên liệu.'
            ],
            [
                'brand_name' => 'Isuzu',
                'brand_logo' => 'Isuzu.png',
                'brand_description' => 'Isuzu nổi tiếng với các dòng xe tải và xe bán tải bền bỉ, hiệu suất cao.'
            ],
            [
                'brand_name' => 'Land Rover',
                'brand_logo' => 'Land-Rover.png',
                'brand_description' => 'Land Rover là thương hiệu xe địa hình sang trọng của Anh, nổi tiếng với khả năng off-road mạnh mẽ.'
            ],
            [
                'brand_name' => 'Mazda',
                'brand_logo' => 'Mazda.png',
                'brand_description' => 'Mazda là hãng xe Nhật với các dòng xe có thiết kế thể thao và công nghệ Skyactiv tiên tiến.'
            ],
            [
                'brand_name' => 'Mitsubishi',
                'brand_logo' => 'Mitsubishi.png',
                'brand_description' => 'Mitsubishi nổi tiếng với các dòng xe SUV và xe bán tải bền bỉ, khả năng off-road tốt.'
            ],
            [
                'brand_name' => 'Nissan',
                'brand_logo' => 'Nissan.png',
                'brand_description' => 'Nissan là hãng xe Nhật, nổi bật với các dòng xe đa dạng từ xe gia đình đến xe thể thao.'
            ],
            [
                'brand_name' => 'Renault',
                'brand_logo' => 'Renault.png',
                'brand_description' => 'Renault là thương hiệu xe hơi Pháp, nổi tiếng với thiết kế sáng tạo và tính năng an toàn.'
            ],
            [
                'brand_name' => 'Suzuki',
                'brand_logo' => 'Suzuki.png',
                'brand_description' => 'Suzuki nổi tiếng với các mẫu xe nhỏ gọn và tiết kiệm nhiên liệu, đặc biệt phổ biến ở châu Á.'
            ],
            [
                'brand_name' => 'Vinfast',
                'brand_logo' => 'Vinfast.png',
                'brand_description' => 'VinFast là hãng xe Việt Nam, nổi tiếng với các dòng xe điện và xe hơi thân thiện môi trường.'
            ],
            [
                'brand_name' => 'Zotye',
                'brand_logo' => 'Zotye.png',
                'brand_description' => 'Zotye là hãng xe Trung Quốc, nổi bật với các mẫu xe giá rẻ và các dòng xe SUV.'
            ],
        ]);
    }
}
