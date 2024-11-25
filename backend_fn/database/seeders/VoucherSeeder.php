<?php

namespace Database\Seeders;

use App\Models\Voucher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Voucher::create([
            'voucher_code' => 'DISCOUNT10',
            'discount_percentage' => 20,
            'expiration_date' => now()->addDays(7),
            'usage_limit' => 5,
        ]);
    }
}
