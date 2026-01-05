import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterMovementsTable1767651506064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE stock_movements
      ALTER COLUMN "createdAt"
      TYPE TIMESTAMPTZ
      USING "createdAt" AT TIME ZONE 'UTC'
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE stock_movements
      ALTER COLUMN "createdAt"
      TYPE TIMESTAMP
    `);
    }

}
