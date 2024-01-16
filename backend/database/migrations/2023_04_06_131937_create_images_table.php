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
        Schema::create('images', static function (Blueprint $table) {
            $table->string('id')->unique()->index();
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users');//->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('active')->default(false);
            $table->json('meta')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
