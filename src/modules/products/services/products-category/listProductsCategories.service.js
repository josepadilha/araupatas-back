"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesService = void 0;
const database_1 = require("../../../../config/database");
const ProductCategory_1 = require("../../entities/ProductCategory");
class ListCategoriesService {
    async execute() {
        const repo = database_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
        const categories = await repo.find();
        return categories;
    }
}
exports.ListCategoriesService = ListCategoriesService;
