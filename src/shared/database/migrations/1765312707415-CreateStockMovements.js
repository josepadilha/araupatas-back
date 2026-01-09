"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockMovements1765312707415 = void 0;
const typeorm_1 = require("typeorm");
class CreateStockMovements1765312707415 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
        // FK – product
        await queryRunner.createForeignKey("stock_movements", new typeorm_1.TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE"
        }));
        // FK – location
        await queryRunner.createForeignKey("stock_movements", new typeorm_1.TableForeignKey({
            columnNames: ["location_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "stock_locations",
            onDelete: "CASCADE"
        }));
        // FK – created_by
        await queryRunner.createForeignKey("stock_movements", new typeorm_1.TableForeignKey({
            columnNames: ["created_by"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL"
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("stock_movements");
    }
}
exports.CreateStockMovements1765312707415 = CreateStockMovements1765312707415;
