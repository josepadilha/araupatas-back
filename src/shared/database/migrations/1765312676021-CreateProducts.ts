import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProducts1765312676021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    
    // Main table
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar", isNullable: true },
          { name: "sku", type: "varchar", isNullable: true },
          { name: "category_id", type: "uuid", isNullable: true },
          { name: "unit_id", type: "uuid", isNullable: true },
          { name: "min_quantity", type: "int", default: 0 },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" }
        ]
      })
    );

    // FK – category
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product_categories",
        onDelete: "SET NULL"
      })
    );

    // FK – unit
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["unit_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product_units",
        onDelete: "SET NULL"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
