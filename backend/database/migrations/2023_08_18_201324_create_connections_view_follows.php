<?php

use App\Connection;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE VIEW `follows` AS
            SELECT
                `id`,
                `type`,
                `user_id`,
                `partner_id`,
                `created_at`
            FROM
                `connections`
            WHERE
                `type` = " . Connection::TYPE_FOLLOW . " 
             OR `type` = " . Connection::TYPE_FOLLOWING
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS `follows`");
    }
};
