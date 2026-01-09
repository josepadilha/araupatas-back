"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCategoriesController = void 0;
const editProductsCategories_service_1 = require("../../services/products-category/editProductsCategories.service");
class EditCategoriesController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const service = new editProductsCategories_service_1.EditProductCategoryService();
            const result = await service.execute({ id, name, description });
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.EditCategoriesController = EditCategoriesController;
