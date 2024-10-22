<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('doctors', function (Blueprint $table) {
        $table->boolean('is_admin')->default(false); // Add the is_admin column
    });
}

public function down()
{
    Schema::table('doctors', function (Blueprint $table) {
        $table->dropColumn('is_admin');
    });
}

};
