<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
class user extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ho = ['Nguyễn', 'Phạm', 'Phan', 'Lê', 'Đỗ', 'Hồ', 'Võ', 'Bùi'];
            $lot = ['Hoàng', 'Phương', 'Văn', 'Thị', 'Hồng', 'Minh'];
            $ten = ['An', 'Quyên', 'Quan', 'Thành', 'Loan', 'Hiếu', 'Nhật', 'Bảo', 'Huy'];
            $genders = ['Male', 'Female'];
            $phones = ['098', '090', '091', '093', '094', '012'];

            for ($i = 0; $i < 5; $i++) {
                $name = Arr::random($ho) . ' ' . Arr::random($lot) . ' ' . Arr::random($ten);
                $gender = Arr::random($genders);
                $birth_date = date('Y-m-d', mt_rand(strtotime('1980-01-01'), strtotime('2005-12-31'))); 
                $email = Str::random(5) . '@gmail.com';
                $password = bcrypt('123');
                $phone = Arr::random($phones) . mt_rand(1000000, 9999999);
                $image = [
                    'hinh1',
                    'hinh2',
                    'hinh3'
                ];
                $streets = ['Nguyễn Huệ', 'Lê Lợi', 'Trần Hưng Đạo', 'Hoàng Hoa Thám', 'Ngô Gia Tự'];
                $wards = ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5'];
                $districts = ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 10'];
                $cities = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'];
                $address = mt_rand(1, 999) . ' ' . Arr::random($streets) . ', ' . Arr::random($wards) . ', ' . Arr::random($districts) . ', ' . Arr::random($cities);

                DB::table('user')->insert([
                    'name' => $name,
                    'gender' => $gender,
                    'birth_date' => $birth_date,
                    'email' => $email,
                    'password' => $password,
                    'phone' => $phone,
                    'image' => Arr::random($image),
                    'address' => $address
                ]);
            }
    }
}
