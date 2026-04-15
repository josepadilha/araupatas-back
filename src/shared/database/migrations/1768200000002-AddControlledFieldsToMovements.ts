import { MigrationInterface, QueryRunner } from "typeorm";

export class AddControlledFieldsToMovements1768200000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stock_movements
      ADD COLUMN "batch_id"          UUID,
      ADD COLUMN "patient_name"      TEXT,
      ADD COLUMN "responsible_name"  TEXT,
      ADD CONSTRAINT "FK_stock_movements_batch"
        FOREIGN KEY ("batch_id") REFERENCES controlled_batches("id") ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE stock_movements
      DROP CONSTRAINT "FK_stock_movements_batch",
      DROP COLUMN "batch_id",
      DROP COLUMN "patient_name",
      DROP COLUMN "responsible_name"
    `);
  }
}
