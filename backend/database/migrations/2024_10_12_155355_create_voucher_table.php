<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //Tạo bảng voucher
        Schema::create('voucher', function (Blueprint $table) {
            $table->id('voucher_id');
            $table->string('voucher_code');
            $table->integer('discount_percentage');
            $table->dateTime('expiration_date');
            $table->integer('usage_limit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher');
    }
};
