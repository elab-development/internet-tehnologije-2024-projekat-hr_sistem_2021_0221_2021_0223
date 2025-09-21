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
        Schema::create('contract_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contract_id');
            $table->unsignedBigInteger('position_id');
            $table->decimal('yearly_salary', 10, 2);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->foreign('contract_id')->references('id')->on('contracts')->onDelete('cascade');
            $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_items');
    }
};
