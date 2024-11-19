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
        Schema::create('booking', function (Blueprint $table) {
            $table->id('booking_id');
            $table->date('booking_date');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->integer('total_cost');
            $table->boolean('booking_status')->default(1);
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id');
            // $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('voucher_id')->nullable(); // Có thể voucher không bắt buộc, nên để nullable

            // Khóa ngoại tham chiếu các bảng tương ứng
            $table->foreign('car_id')->references('car_id')->on('car');
            $table->foreign('user_id')->references('id')->on('users');  // Tham chiếu đúng bảng users
            // $table->foreign('location_id')->references('location_id')->on('location');
            $table->foreign('voucher_id')->references('voucher_id')->on('voucher');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};