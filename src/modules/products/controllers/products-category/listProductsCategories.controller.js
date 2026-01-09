"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesController = void 0;
const listProductsCategories_service_1 = require("../../services/products-category/listProductsCategories.service");
class ListCategoriesController {
    async handle(req, res) {
        try {
            const service = new listProductsCategories_service_1.ListCategoriesService();
            const categories = await service.execute();
            return res.status(200).json(categories);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ListCategoriesController = ListCategoriesController;
