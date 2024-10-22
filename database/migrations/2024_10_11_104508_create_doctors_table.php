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
        Schema::create('doctors', function (Blueprint $table) {
            // $table->id();
            // $table->string('doctor_name');
            $table->string('registration_number');
            $table->string('speciality');
            $table->string('education');
            // $table->string('contact');
            // $table->string('email')->unique();
            // $table->string('password');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
