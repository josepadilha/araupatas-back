import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductCategories1765312642817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "product_categories",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "name", type: "varchar" },
          { name: "description", type: "varchar", isNullable: true },
          { name: "createdAt", type: "timestamp", default: "now()" },
          { name: "updatedAt", type: "timestamp", default: "now()" },
          { name: "deletedAt", type: "timestamp", isNullable: true}
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product_categories");
  }

}
