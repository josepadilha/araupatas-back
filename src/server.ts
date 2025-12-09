import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import { authRoutes } from "./modules/auth/routes";
import { usersRoutes } from "./modules/users/routes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);


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
