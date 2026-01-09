"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterUsersTable1766429218596 = void 0;
const typeorm_1 = require("typeorm");
class AlterUsersTable1766429218596 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new typeorm_1.TableColumn({
            name: "isActive",
            type: "boolean",
            default: true,
            isNullable: false,
        }));
        await queryRunner.query(`
          UPDATE users SET "isActive" = true WHERE "isActive" IS NULL
        `);
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "isActive");
    }
}
exports.AlterUsersTable1766429218596 = AlterUsersTable1766429218596;
