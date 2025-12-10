import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductUnits1765312661110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "product_units",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "name", type: "varchar" },        // "caixa", "unidade", "ml", "kit"
          { name: "abbreviation", type: "varchar" }, // "cx", "un", "ml"
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product_units");
  }

}
