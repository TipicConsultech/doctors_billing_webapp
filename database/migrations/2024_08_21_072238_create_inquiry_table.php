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
        Schema::create('inquiry', function (Blueprint $table) {
            $table->id(); // Auto-incremental ID
            $table->string('name'); // Name column
            $table->string('email'); // Email column
            $table->string('contact_number'); // Contact number column
            $table->text('message'); // Message column
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiry');
    }
};
