"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockLocations1765312693323 = void 0;
const typeorm_1 = require("typeorm");
class CreateStockLocations1765312693323 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: "stock_locations",
            columns: [
                { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
                { name: "name", type: "varchar" },
                { name: "description", type: "varchar", isNullable: true },
                { name: "deletedAt", type: "timestamp", isNullable: true },
                { name: "createdAt", type: "timestamp", default: "now()" },
                { name: "updatedAt", type: "timestamp", default: "now()" }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("stock_locations");
    }
}
exports.CreateStockLocations1765312693323 = CreateStockLocations1765312693323;
