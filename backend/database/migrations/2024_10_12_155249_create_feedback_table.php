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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
