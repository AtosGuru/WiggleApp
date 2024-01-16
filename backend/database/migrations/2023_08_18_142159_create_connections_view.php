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
            CREATE VIEW `reads` AS 
            SELECT 
                `messages`.`connection_id` AS `id`,
                `messages`.`created_at` AS `created_at`,
                `read`.`updated_at` AS `updated_at`,
                `connections`.`type` AS `type`,
                `users`.`id` AS `user_id`,
                `messages`.`id` AS `message_id`,
                (`messages`.`created_at` <= COALESCE(`read`.`updated_at`, 0)) AS `is_read`
            FROM
                `messages`
                JOIN `connections` 
                    ON `messages`.`connection_id` = `connections`.`id`
                JOIN `users` 
                    ON `users`.`id` = `connections`.`user_id`
                    OR `users`.`id` = `connections`.`partner_id`
                LEFT JOIN `connections` `read` 
                    ON `read`.`type` = " . Connection::TYPE_MESSAGE_READ . "
                    AND `users`.`id` = `read`.`user_id`
                    AND `read`.`connection_id` = `messages`.`connection_id`
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS `reads`");
    }
};
