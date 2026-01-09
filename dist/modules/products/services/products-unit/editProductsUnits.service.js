"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductunitService = void 0;
const database_1 = require("../../../../config/database");
const ProductUnit_1 = require("../../entities/ProductUnit");
class EditProductunitService {
    async execute({ id, name, description }) {
        const repo = database_1.AppDataSource.getRepository(ProductUnit_1.ProductUnit);
        const unit = await repo.findOne({ where: { id } });
        if (!unit) {
            throw new Error("Unit not found.");
        }
        const existing = await repo.findOne({
            where: { name }
        });
        if (existing && existing.id !== id) {
            throw new Error("Unit already exists");
        }
        unit.name = name;
        await repo.update(id, { name });
        return unit;
    }
}
exports.EditProductunitService = EditProductunitService;
