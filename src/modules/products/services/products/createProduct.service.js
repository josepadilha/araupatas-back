"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const database_1 = require("../../../../config/database");
const Product_1 = require("../../entities/Product");
const ProductCategory_1 = require("../../entities/ProductCategory");
const ProductUnit_1 = require("../../entities/ProductUnit");
class CreateProductService {
    async execute({ name, description, sku, categoryId, unitId, quantity }) {
        const repo = database_1.AppDataSource.getRepository(Product_1.Product);
        const categoryRepo = database_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
        const unitRepo = database_1.AppDataSource.getRepository(ProductUnit_1.ProductUnit);
        const category = await categoryRepo.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new Error("Category not found.");
        }
        const unit = await unitRepo.findOne({ where: { id: unitId } });
        if (!unit) {
            throw new Error("Unit not found.");
        }
        const product = repo.create({
            name,
            description,
            sku,
            category_id: category.id,
            unit_id: unit.id,
            min_quantity: quantity,
        });
        await repo.save(product);
        return product;
    }
}
exports.CreateProductService = CreateProductService;
