"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    synchronize: false,
    logging: false,
    entities: ["src/modules/**/entities/*.{ts,js}"],
    migrations: ["src/shared/database/migrations/*.{ts,js}"],
    extra: {
        max: 5,
    },
});
