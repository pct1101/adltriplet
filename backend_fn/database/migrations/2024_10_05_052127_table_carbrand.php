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
        Schema::create('carbrand', function (Blueprint $table) {
            $table->id('brand_id');
            $table->string('brand_name')->unique();
            $table->string('brand_logo')->nullable();
            $table->string('brand_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carbrand');
    }
};
