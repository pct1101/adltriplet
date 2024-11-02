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
        Schema::create('car', function (Blueprint $table) {
            $table->id('car_id');
            $table->string('car_name'); // Tên xe
            $table->integer('seats')->nullable(); //số ghế
            $table->year('model')->nullable(); // Năm sx
            $table->string('license_plate')->unique(); // biển số
            $table->double('rental_price')->nullable(); // Giá thuê
            $table->boolean('car_status')->default(1); // Trạng thái
            $table->double('mileage')->nullable(); // số km đã đi
            $table->string('car_image')->nullable(); // hình
            $table->string('car_description')->nullable(); // mô tả
            $table->unsignedBigInteger('brandid');
            $table->foreign('brandid')->references('brand_id')->on('carbrand');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car');
    }
};
