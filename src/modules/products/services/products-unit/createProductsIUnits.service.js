"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductUnitService = void 0;
const database_1 = require("../../../../config/database");
const ProductUnit_1 = require("../../entities/ProductUnit");
class CreateProductUnitService {
    async execute({ name, description }) {
        const repo = database_1.AppDataSource.getRepository(ProductUnit_1.ProductUnit);
        const newUnit = repo.create({
            name
        });
        await repo.save(newUnit);
        return newUnit;
    }
}
exports.CreateProductUnitService = CreateProductUnitService;
