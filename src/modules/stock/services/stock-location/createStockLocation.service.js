"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockLocationService = void 0;
const database_1 = require("../../../../config/database");
const StockLocation_1 = require("../../entities/StockLocation");
class CreateStockLocationService {
    async execute({ name, description }) {
        const repo = database_1.AppDataSource.getRepository(StockLocation_1.StockLocation);
        const newLocation = repo.create({
            name,
            description
        });
        await repo.save(newLocation);
        return;
    }
}
exports.CreateStockLocationService = CreateStockLocationService;
