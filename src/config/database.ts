import { DataSource } from "typeorm";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,

  ssl: isProd ? { rejectUnauthorized: false } : false,

  synchronize: false,
  logging: false,

  entities: isProd
    ? ["dist/modules/**/entities/*.js"]
    : ["src/modules/**/entities/*.ts"],

  migrations: isProd
    ? ["dist/shared/database/migrations/*.js"]
    : ["src/shared/database/migrations/*.ts"],

  extra: {
    max: 5,
  },
});
