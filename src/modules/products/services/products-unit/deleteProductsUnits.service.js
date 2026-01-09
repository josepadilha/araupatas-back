"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductUnitService = void 0;
const database_1 = require("../../../../config/database");
const ProductUnit_1 = require("../../entities/ProductUnit");
class DeleteProductUnitService {
    async execute(id) {
        const repo = database_1.AppDataSource.getRepository(ProductUnit_1.ProductUnit);
        const unit = await repo.findOne({ where: { id } });
        if (!unit) {
            throw new Error("Unit not found");
        }
        await repo.softRemove(unit);
        return { message: "Unit disabled" };
    }
}
exports.DeleteProductUnitService = DeleteProductUnitService;
