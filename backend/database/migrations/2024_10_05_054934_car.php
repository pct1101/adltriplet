<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //Tạo bảng car
        Schema::create('car', function (Blueprint $table) {
            $table->id('car_id');
            $table->string('car_name');
            $table->integer('seats');
            $table->year('model');
            $table->string('license_plate');
            $table->double('rental_price');
            $table->boolean('car_status')->default(1);
            $table->double('mileage');
            $table->string('car_image');
            $table->string('car_description');
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
