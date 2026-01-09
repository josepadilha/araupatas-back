"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategoryService = void 0;
const database_1 = require("../../../../config/database");
const ProductCategory_1 = require("../../entities/ProductCategory");
class CreateProductCategoryService {
    async execute({ name }) {
        const repo = database_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
        const newCategory = repo.create({
            name,
        });
        await repo.save(newCategory);
        return newCategory;
    }
}
exports.CreateProductCategoryService = CreateProductCategoryService;
