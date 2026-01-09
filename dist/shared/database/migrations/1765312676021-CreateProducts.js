"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProducts1765312676021 = void 0;
const typeorm_1 = require("typeorm");
class CreateProducts1765312676021 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        // Main table
        await queryRunner.createTable(new typeorm_1.Table({
            name: "products",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "name", type: "varchar" },
                { name: "description", type: "varchar", isNullable: true },
                { name: "sku", type: "varchar", isNullable: true }, // variação do produto (tamanho, cor)
                { name: "category_id", type: "uuid", isNullable: true },
                { name: "unit_id", type: "uuid", isNullable: true },
                { name: "min_quantity", type: "int", default: 0 },
                { name: "createdAt", type: "timestamp", default: "now()" },
                { name: "updatedAt", type: "timestamp", default: "now()" },
                { name: "deletedAt", type: "timestamp", isNullable: true }
            ]
        }));
        // FK – category
        await queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_categories",
            onDelete: "SET NULL"
        }));
        // FK – unit
        await queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
            columnNames: ["unit_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_units",
            onDelete: "SET NULL"
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("products");
    }
}
exports.CreateProducts1765312676021 = CreateProducts1765312676021;
