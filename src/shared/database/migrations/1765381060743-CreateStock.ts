import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStock1765381060743 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "stock",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "product_id",
            type: "uuid"
          },
          {
            name: "location_id",
            type: "uuid"
          },
          {
            name: "quantity",
            type: "int",
            default: 0
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true
          }
        ]
      })
    );

    // FK product
    await queryRunner.createForeignKey(
      "stock",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "CASCADE"
      })
    );

    // FK location
    await queryRunner.createForeignKey(
      "stock",
      new TableForeignKey({
        columnNames: ["location_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "stock_locations",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("stock");
  }
}
