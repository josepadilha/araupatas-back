"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductUnits1765312661110 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductUnits1765312661110 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product_units",
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
        await queryRunner.dropTable("product_units");
    }
}
exports.CreateProductUnits1765312661110 = CreateProductUnits1765312661110;
