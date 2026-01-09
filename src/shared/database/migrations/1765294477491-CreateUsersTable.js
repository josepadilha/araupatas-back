"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1765294477491 = void 0;
class CreateUsersTable1765294477491 {
    constructor() {
        this.name = 'CreateUsersTable1765294477491';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(),"deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateUsersTable1765294477491 = CreateUsersTable1765294477491;
