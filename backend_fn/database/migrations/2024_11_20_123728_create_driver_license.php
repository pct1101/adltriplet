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
        Schema::create('driver_licenses', function (Blueprint $table) {
            $table->id('driver_license_id'); // ID duy nhất cho mỗi giấy phép
            $table->unsignedBigInteger('user_id'); // Khóa ngoại liên kết với bảng users
            $table->string('license_number')->unique(); // Số giấy phép
            $table->string('license_holder'); // Tên người sở hữu giấy phép
            $table->enum('license_type', ['B2', 'C', 'D','E'])->nullable();; // Loại giấy phép
            $table->string('license_image'); // Hình giấy phép lái xe
            $table->enum('license_status', ['active', 'inactive', 'invalid'])->default('inactive')->nullable(); // Trạng thái
            $table->date('expiry_date')->nullable(); // Ngày hết hạn
            $table->string('issued_by')->nullable(); // Cơ quan cấp giấy phép
            $table->text('rejection_reason')->nullable(); // Lý do hủy

            $table->timestamps();

            // Định nghĩa khóa ngoại
            $table->foreign('user_id')->references('id')->on('users');  // Tham chiếu đúng bảng users
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_licenses');
    }
};
