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
        //car Image
        Schema::create('carImage', function (Blueprint $table) {
            $table->id('carImage_id');
            $table->string('carImage_url');
            $table->string('carImage_description');
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
        Schema::dropIfExists('carImage');
    }
};
