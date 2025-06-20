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
        Schema::create('favorite', function (Blueprint $table) {
            $table->id('favorite_id');
            $table->date('date_favorite');
            $table->unsignedBigInteger('user_id');  // Chỉ khai báo 1 lần
            $table->unsignedBigInteger('car_id');

            // Khóa ngoại tham chiếu đúng tên bảng và cột
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('car_id')->references('car_id')->on('car');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorite');
    }
};
