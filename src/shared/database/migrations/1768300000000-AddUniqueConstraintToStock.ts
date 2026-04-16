import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class AddUniqueConstraintToStock1768300000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      "stock",
      new TableUnique({
        name: "UQ_stock_product_location",
        columnNames: ["product_id", "location_id"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint("stock", "UQ_stock_product_location");
  }
}
