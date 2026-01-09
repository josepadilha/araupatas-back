"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductService = void 0;
const database_1 = require("../../../../config/database");
const Product_1 = require("../../entities/Product");
class DeleteProductService {
    async execute(id) {
        const repo = database_1.AppDataSource.getRepository(Product_1.Product);
        const product = await repo.findOne({ where: { id } });
        if (!product) {
            throw new Error("Category not found.");
        }
        await repo.softRemove(product);
        return product;
    }
}
exports.DeleteProductService = DeleteProductService;
