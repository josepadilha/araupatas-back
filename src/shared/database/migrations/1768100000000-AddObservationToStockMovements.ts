import { MigrationInterface, QueryRunner } from "typeorm";

export class AddObservationToStockMovements1768100000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE stock_movements
            ADD COLUMN IF NOT EXISTS observation TEXT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE stock_movements
            DROP COLUMN IF EXISTS observation
        `);
    }
}
