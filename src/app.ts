import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import { usersRoutes } from "./modules/users/routes";
import { productsRoutes } from "./modules/products/routes";
import { stockRoutes } from "./modules/stock/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/stock", stockRoutes);

if (process.env.FIREBASE_FUNCTIONS !== "true") {
  AppDataSource.initialize()
    .then(() => {
      console.log("📦 Banco conectado com sucesso!");
    })
    .catch(error => {
      console.error("Erro ao inicializar o banco:", error);
    });
}

export default app;