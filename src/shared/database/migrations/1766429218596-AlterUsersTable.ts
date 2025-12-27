import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersTable1766429218596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "isActive",
                type: "boolean",
                default: true,
                isNullable: false,
            })
        );
        await queryRunner.query(`
          UPDATE users SET "isActive" = true WHERE "isActive" IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "isActive");
    }

}
