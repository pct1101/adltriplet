<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CarBrandSeeder::class,  // Giả sử bạn đã tạo CarBrandSeeder
            CarSeeder::class,
            CarImageSeeder::class,   // Thêm CarImageSeeder
            FavoriteSeeder::class,
            FeedbackSeeder::class,
        ]);
    }
}
