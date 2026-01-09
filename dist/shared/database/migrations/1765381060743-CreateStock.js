"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStock1765381060743 = void 0;
const typeorm_1 = require("typeorm");
class CreateStock1765381060743 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: "stock",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "product_id",
                    type: "uuid"
                },
                {
                    name: "location_id",
                    type: "uuid"
                },
                {
                    name: "quantity",
                    type: "int",
                    default: 0
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));
        // FK product
        await queryRunner.createForeignKey("stock", new typeorm_1.TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE"
        }));
        // FK location
        await queryRunner.createForeignKey("stock", new typeorm_1.TableForeignKey({
            columnNames: ["location_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "stock_locations",
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("stock");
    }
}
exports.CreateStock1765381060743 = CreateStock1765381060743;
