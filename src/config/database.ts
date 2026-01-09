import { DataSource } from "typeorm";
import "dotenv/config";
import { defineString } from "firebase-functions/params";

export const DATABASE_URL = defineString("DATABASE_URL");

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_URL.value(),

  ssl: isProd
    ? { rejectUnauthorized: false }
    : false,

  synchronize: false,
  logging: false,

  entities: ["src/modules/**/entities/*.{ts,js}"],
  migrations: ["src/shared/database/migrations/*.{ts,js}"],

  extra: {
    max: 5,
  },
});
