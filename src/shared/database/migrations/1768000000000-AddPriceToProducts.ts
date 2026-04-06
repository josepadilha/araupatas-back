import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceToProducts1768000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS price numeric(10, 2) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products
      DROP COLUMN IF EXISTS price
    `);
  }
}
