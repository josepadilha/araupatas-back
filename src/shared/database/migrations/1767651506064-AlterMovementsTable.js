"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterMovementsTable1767651506064 = void 0;
class AlterMovementsTable1767651506064 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE stock_movements
      ALTER COLUMN "createdAt"
      TYPE TIMESTAMPTZ
      USING "createdAt" AT TIME ZONE 'UTC'
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE stock_movements
      ALTER COLUMN "createdAt"
      TYPE TIMESTAMP
    `);
    }
}
exports.AlterMovementsTable1767651506064 = AlterMovementsTable1767651506064;
