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
        //add columns to users table
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('employee');
            $table->string('telephone')->nullable();
            $table->string('address')->nullable();
            $table->date('date_of_birth')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
