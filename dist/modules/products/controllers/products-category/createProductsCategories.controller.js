"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsCategoriesController = void 0;
const createProductsCategories_service_1 = require("../../services/products-category/createProductsCategories.service");
class CreateProductsCategoriesController {
    async handle(req, res) {
        const { name } = req.body;
        try {
            const service = new createProductsCategories_service_1.CreateProductCategoryService();
            const newCategory = await service.execute({
                name
            });
            return res.status(201).json(newCategory);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateProductsCategoriesController = CreateProductsCategoriesController;
