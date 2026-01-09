"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductCategoryService = void 0;
const database_1 = require("../../../../config/database");
const ProductCategory_1 = require("../../entities/ProductCategory");
class DeleteProductCategoryService {
    async execute(id) {
        const repo = database_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
        const category = await repo.findOne({ where: { id } });
        if (!category) {
            throw new Error("Category not found");
        }
        await repo.softRemove(category);
        return { message: "Category disabled" };
    }
}
exports.DeleteProductCategoryService = DeleteProductCategoryService;
