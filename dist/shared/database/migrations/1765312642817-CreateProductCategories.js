"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategories1765312642817 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductCategories1765312642817 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product_categories",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "name", type: "varchar" },
                { name: "description", type: "varchar", isNullable: true },
                { name: "createdAt", type: "timestamp", default: "now()" },
                { name: "updatedAt", type: "timestamp", default: "now()" },
                { name: "deletedAt", type: "timestamp", isNullable: true }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product_categories");
    }
}
exports.CreateProductCategories1765312642817 = CreateProductCategories1765312642817;
