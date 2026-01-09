"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const routes_1 = require("./modules/users/routes");
const routes_2 = require("./modules/products/routes");
const routes_3 = require("./modules/stock/routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", routes_1.usersRoutes);
app.use("/products", routes_2.productsRoutes);
app.use("/stock", routes_3.stockRoutes);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Banco conectado com sucesso!");
})
    .catch(error => {
    console.error("Erro ao inicializar o banco:", error);
});
exports.default = app;
