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
        Schema::create('car_image', function (Blueprint $table) {
            $table->id('carImage_id');
            $table->string('carImage_url')->nullable();
            $table->string('carImage_description')->nullable();
            $table->unsignedBigInteger('car_id');
            $table->foreign('car_id')->references('car_id')->on('car');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_image');
    }
};
