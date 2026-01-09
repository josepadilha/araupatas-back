"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStockLocationService = void 0;
const database_1 = require("../../../../config/database");
const StockLocation_1 = require("../../entities/StockLocation");
class EditStockLocationService {
    async execute({ id, name, description }) {
        const repo = database_1.AppDataSource.getRepository(StockLocation_1.StockLocation);
        const location = await repo.findOne({ where: { id } });
        if (!location) {
            throw new Error("Location not found.");
        }
        const existing = await repo.findOne({
            where: { name }
        });
        if (existing && existing.id !== id) {
            throw new Error("Location already exists");
        }
        location.name = name ? name : location.name;
        location.description = description ? description : location.description;
        await repo.update(id, location);
        return location;
    }
}
exports.EditStockLocationService = EditStockLocationService;
