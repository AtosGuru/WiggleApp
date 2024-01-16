<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement("
            CREATE VIEW `counters` AS 
            
            SELECT 
                `users`.`id` AS `user_id`,
                `reads`.`id` AS `connection_id`,
                SUM((`reads`.`is_read` = 1)) AS `read`,
                SUM((`reads`.`is_read` = 0)) AS `unread`,
                (SELECT 
                        SUM(`connections`.`type` = " . \App\Connection::TYPE_FOLLOWING . ") AS `follows`
                    FROM
                        `connections`
                    WHERE
                        `connections`.`user_id` = `users`.`id`) AS `follows`,
                (SELECT 
                        SUM((`connections`.`type` = 2)) AS `followers`
                    FROM
                        `connections`
                    WHERE
                        (`connections`.`partner_id` = `users`.`id`)) AS `followers`
            FROM
                `users`
                LEFT JOIN `reads` 
                ON `reads`.`user_id` = `users`.`id`
            GROUP BY `users`.`id` , `reads`.`id`
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS `counters`");
    }

};