import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import { usersRoutes } from "./modules/users/routes";
import { productsRoutes } from "./modules/products/routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado com sucesso!");

    app.listen(3333, () => {
      console.log("🚀 Server running on port 3333");
    });
  })
  .catch(error => {
    console.error("Erro ao inicializar o banco:", error);
  });
