"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductService = void 0;
const database_1 = require("../../../../config/database");
const Product_1 = require("../../entities/Product");
const ProductCategory_1 = require("../../entities/ProductCategory");
const ProductUnit_1 = require("../../entities/ProductUnit");
class EditProductService {
    async execute({ id, name, description, category_id, unit_id, sku, quantity }) {
        const repo = database_1.AppDataSource.getRepository(Product_1.Product);
        const categoryRepo = database_1.AppDataSource.getRepository(ProductCategory_1.ProductCategory);
        const unitRepo = database_1.AppDataSource.getRepository(ProductUnit_1.ProductUnit);
        const product = await repo.findOne({ where: { id } });
        if (!product) {
            throw new Error("Category not found.");
        }
        const category = await categoryRepo.findOne({ where: { id: category_id } });
        if (!category) {
            throw new Error("Category not found.");
        }
        const unit = await unitRepo.findOne({ where: { id: unit_id } });
        if (!unit) {
            throw new Error("Unit not found.");
        }
        product.name = name;
        product.description = description ? description : product.description;
        product.sku = sku ? sku : product.sku;
        product.min_quantity = quantity ? quantity : product.min_quantity;
        product.category_id = category_id ? category_id : product.category_id;
        product.unit_id = unit_id ? unit_id : product.unit_id;
        await repo.update(id, product);
        return product;
    }
}
exports.EditProductService = EditProductService;
