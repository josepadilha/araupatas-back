"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockService = void 0;
const database_1 = require("../../../../config/database");
const Product_1 = require("../../../products/entities/Product");
const Stock_1 = require("../../entities/Stock");
const StockLocation_1 = require("../../entities/StockLocation");
class CreateStockService {
    async execute({ locationId, productId }) {
        const repo = database_1.AppDataSource.getRepository(Stock_1.Stock);
        const stockLocationRepo = database_1.AppDataSource.getRepository(StockLocation_1.StockLocation);
        const productRepo = database_1.AppDataSource.getRepository(Product_1.Product);
        const location = await stockLocationRepo.findOne({ where: { id: locationId } });
        if (!location) {
            throw new Error("Location not found.");
        }
        const product = await productRepo.findOne({ where: { id: productId } });
        if (!product) {
            throw new Error("Product not found.");
        }
        const stock = repo.create({
            location_id: locationId,
            product_id: productId,
            quantity: 0
        });
        await repo.save(stock);
        return stock;
    }
}
exports.CreateStockService = CreateStockService;
