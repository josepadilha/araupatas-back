import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStockMovements1765312707415 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "stock_movements",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },

          { name: "product_id", type: "uuid" },
          { name: "location_id", type: "uuid" },

          { name: "type", type: "varchar" }, // IN, OUT, TRANSFER, ADJUST
          { name: "quantity", type: "int" },

          { name: "from_location_id", type: "uuid", isNullable: true },
          { name: "to_location_id", type: "uuid", isNullable: true },

          { name: "created_by", type: "varchar" },

          { name: "createdAt", type: "timestamp", default: "now()" }
        ]
      })
    );

    // FK – product
    await queryRunner.createForeignKey(
      "stock_movements",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "CASCADE"
      })
    );

    // FK – location
    await queryRunner.createForeignKey(
      "stock_movements",
      new TableForeignKey({
        columnNames: ["location_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "stock_locations",
        onDelete: "CASCADE"
      })
    );

    // FK – created_by
    await queryRunner.createForeignKey(
      "stock_movements",
      new TableForeignKey({
        columnNames: ["created_by"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("stock_movements");
  }

}
