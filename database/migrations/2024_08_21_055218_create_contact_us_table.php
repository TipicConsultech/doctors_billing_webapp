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
        Schema::create('contact_us', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('first_name'); // First name
            $table->string('last_name'); // Last name
            $table->string('email'); // Email
            $table->string('mobile'); // Mobile number
            $table->string('location'); // Location
            $table->string('vehicle_category'); // Vehicle category
            $table->string('vehicle_registration_number'); // Vehicle registration number
            $table->timestamps(); // Created at and updated at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_us');
    }
};
