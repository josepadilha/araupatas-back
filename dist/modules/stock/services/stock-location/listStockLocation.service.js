"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStockLocationService = void 0;
const database_1 = require("../../../../config/database");
const StockLocation_1 = require("../../entities/StockLocation");
class ListStockLocationService {
    async execute() {
        const repo = database_1.AppDataSource.getRepository(StockLocation_1.StockLocation);
        const units = await repo.find();
        return units;
    }
}
exports.ListStockLocationService = ListStockLocationService;
