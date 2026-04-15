import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateControlledBatches1768200000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE controlled_batches (
        "id"                UUID NOT NULL DEFAULT gen_random_uuid(),
        "product_id"        UUID NOT NULL,
        "location_id"       UUID NOT NULL,
        "batch_number"      VARCHAR NOT NULL,
        "expiration_date"   DATE NOT NULL,
        "initial_quantity"  INTEGER NOT NULL,
        "current_quantity"  INTEGER NOT NULL,
        "nf_number"         VARCHAR,
        "createdAt"         TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt"         TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_controlled_batches" PRIMARY KEY ("id"),
        CONSTRAINT "FK_controlled_batches_product"
          FOREIGN KEY ("product_id") REFERENCES products("id") ON DELETE CASCADE,
        CONSTRAINT "FK_controlled_batches_location"
          FOREIGN KEY ("location_id") REFERENCES stock_locations("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE controlled_batches`);
  }
}
