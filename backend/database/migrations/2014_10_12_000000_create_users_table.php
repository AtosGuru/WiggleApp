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
        Schema::create('users', static function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp('email_verified_at')->nullable();

            $table->string('email',128)->unique()->nullable();
            $table->string('phone', 30)->unique()->nullable();
            $table->string('social_id')->unique()->nullable()
                  ->comment('Unique user OAuth id...');

            $table->string('name');
            $table->json('profile')->nullable();

            $table->rememberToken();
            $table->string('refresh_token')->nullable()
                  ->comment('Token to refresh social account');
            $table->string('password');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
