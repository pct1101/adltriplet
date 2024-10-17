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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location');
    }
};
