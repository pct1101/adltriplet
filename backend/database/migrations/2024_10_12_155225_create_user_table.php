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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
