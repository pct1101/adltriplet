<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Danh sách tên, họ và tên đệm
        $ho = ['Nguyễn', 'Phạm', 'Phan', 'Lê', 'Đỗ', 'Hồ', 'Võ', 'Bùi'];
        $lot = ['Hoàng', 'Phương', 'Văn', 'Thị', 'Hồng', 'Minh'];
        $ten = ['An', 'Quyên', 'Quan', 'Thành', 'Loan', 'Hiếu', 'Nhật', 'Bảo', 'Huy'];
        $genders = ['male', 'female', 'other'];
        $phones = ['098', '090', '091', '093', '094', '012'];

        for ($i = 0; $i < 5; $i++) {
            $name = Arr::random($ho) . ' ' . Arr::random($lot) . ' ' . Arr::random($ten);
            $gender = Arr::random($genders);
            $birth_date = date('Y-m-d', mt_rand(strtotime('1980-01-01'), strtotime('2005-12-31')));
            $email = Str::random(5) . '@gmail.com';
            $password = bcrypt('123456789');
            $phone = Arr::random($phones) . mt_rand(1000000, 9999999);
            $image = Arr::random(['hinh1.jpg', 'hinh2.jpg', 'hinh3.jpg']); // Đảm bảo có phần mở rộng
            $address = mt_rand(1, 999) . ' ' . Arr::random(['Nguyễn Huệ', 'Lê Lợi', 'Trần Hưng Đạo', 'Hoàng Hoa Thám', 'Ngô Gia Tự']) . ', ' .
                Arr::random(['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4', 'Phường 5']) . ', ' .
                Arr::random(['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 10']) . ', ' .
                Arr::random(['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng']);

            DB::table('users')->insert([
                'name' => $name,
                'email' => $email,
                'image' => $image,
                'gender' => $gender,
                'birth_date' => $birth_date,
                'phone' => $phone,
                'address' => $address,
                'role' => 'user',  // Mặc định là 'user'
                'status' => 1,     // Mặc định là 1 (hoạt động)
                'password' => $password,
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
