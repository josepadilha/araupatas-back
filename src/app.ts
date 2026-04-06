import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import { usersRoutes } from "./modules/users/routes";
import { productsRoutes } from "./modules/products/routes";
import { stockRoutes } from "./modules/stock/routes";

export const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/stock", stockRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado com sucesso!");

        app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Erro ao inicializar o banco:", error);
  });
