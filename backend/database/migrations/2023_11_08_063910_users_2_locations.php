<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('users_2_locations', function(Blueprint $table){
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreignId('location_id')->references('id')->on('locations')->cascadeOnDelete();
            $table->timestamp('created_at');

            $table->unique(['user_id', 'location_id']);
        });

        Schema::table('locations', function (Blueprint $table){
            $table->tinyInteger('level')->default(0)->after('place');
        });
    }

    public function down(): void
    {
        Schema::table('locations', function (Blueprint $table){
            $table->dropColumn('level');
        });
        Schema::dropIfExists('users_2_locations');
    }
};

