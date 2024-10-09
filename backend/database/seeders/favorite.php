<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
class favorite extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = DB::table('user')->pluck('user_id')->toArray();
        $carIds = DB::table('car')->pluck('car_id')->toArray();

        // Tạo 5 mục yêu thích giả lập
        for ($i = 0; $i < 5; $i++) {
            DB::table('favorite')->insert([
                'date_favorite' => now()->subDays(rand(0, 30)),
                'user_id' => Arr::random($userIds),
                'car_id' => Arr::random($carIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
