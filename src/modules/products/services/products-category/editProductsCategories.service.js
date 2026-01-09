"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductCategoryService = void 0;
const database_1 = require("../../../../config/database");
const ProductCategory_1 = require("../../entities/ProductCategory");
class EditProductCategoryService {
    async execute({ id, name }) {
        const repo = database_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
        const category = await repo.findOne({ where: { id } });
        if (!category) {
            throw new Error("Category not found.");
        }
        const existing = await repo.findOne({
            where: { name }
        });
        if (existing && existing.id !== id) {
            throw new Error("Category already exists");
        }
        category.name = name;
        await repo.update(id, { name });
        return category;
    }
}
exports.EditProductCategoryService = EditProductCategoryService;
