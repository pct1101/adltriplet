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
            $table->string('car_description');
            $table->unsignedBigInteger('brandid');
            $table->foreign('brandid')->references('brand_id')->on('carbrand');
            $table->timestamps();
        });

        //Tạo bảng user
        Schema::create('user', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('name', 100);
            $table->string('image');
            $table->string('gender');
            $table->date('birth_date', 100)->nullable();
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->string('password');
            $table->boolean('role')->default(0);
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        //Tạo bảng favorite
        Schema::create('favorite', function (Blueprint $table) {
            $table->id('favorite_id');
            $table->date('date_favorite');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id');
            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('car_id')->references('car_id')->on('car');
            $table->timestamps();
        });

        //Tạo bảng feedback
        Schema::create('feedback', function (Blueprint $table) {
            $table->id('feedback_id');
            $table->string('content');
            $table->string('rating');
            $table->date('feedback_date');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id');
            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('car_id')->references('car_id')->on('car');
            $table->timestamps();
        });
        Schema::create('carImage', function (Blueprint $table) {
            $table->id('carImage_id');
            $table->string('carImage_url');
            $table->string('carImage_description');
            $table->unsignedBigInteger('car_id');
            $table->foreign('car_id')->references('car_id')->on('car');
            $table->timestamps();
        });

        //Tạo bảng banner
        Schema::create('banner', function (Blueprint $table) {
            $table->id('banner_id');
            $table->string('banner_url');
            $table->boolean('banner_status')->default(1);
            $table->timestamps();
        });

        //Tạo bảng location
        Schema::create('location', function (Blueprint $table) {
            $table->id('location_id');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->dateTime('pickup_time');
            $table->dateTime('return_time');
            $table->timestamps();
        });

        //Tạo bảng voucher
        Schema::create('voucher', function (Blueprint $table) {
            $table->id('voucher_id');
            $table->string('voucher_code');
            $table->integer('discount_percentage');
            $table->dateTime('expiration_date');
            $table->integer('usage_limit');
            $table->timestamps();
        });

        //Tạo bảng booking
        Schema::create('booking', function (Blueprint $table) {
            $table->id('booking_id');
            $table->date('booking_date');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_cost');
            $table->boolean('booking_status')->default(1);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id');
            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('voucher_id');
            $table->foreign('car_id')->references('car_id')->on('car');
            $table->foreign('user_id')->references('user_id')->on('user');
            $table->foreign('location_id')->references('location_id')->on('location');
            $table->foreign('voucher_id')->references('voucher_id')->on('voucher');
            $table->timestamps();
        });

        //Tao bang reset password
        Schema::create('passwordreset', function (Blueprint $table) {
            $table->id();
            $table->string('token');
            $table->timestamp('requested_at');
            $table->timestamp('expires_at')->nullable();
            $table->string('status');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('user');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car');
        Schema::dropIfExists('user');
        Schema::dropIfExists('favorite');
        Schema::dropIfExists('feedback');
        Schema::dropIfExists('carImage');
        Schema::dropIfExists('banner');
        Schema::dropIfExists('location');
        Schema::dropIfExists('voucher');
        Schema::dropIfExists('booking');
        Schema::dropIfExists('passwordreset');
    }
};
