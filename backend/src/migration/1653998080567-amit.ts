import { MigrationInterface, QueryRunner } from "typeorm"

export class amit1653998080567 implements MigrationInterface {

    public async up( queryRunner: QueryRunner ): Promise<void> {
        queryRunner.query( "ALTER TABLE `customers` ADD `password` VARCHAR(12) NOT NULL AFTER `address`" );
    }

    public async down( queryRunner: QueryRunner ): Promise<void> {
        queryRunner.query(
            "ALTER TABLE `customers` DROP `password`" );
    }

}
