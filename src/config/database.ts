import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
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