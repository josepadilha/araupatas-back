"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductsController = void 0;
const editProductsCategories_service_1 = require("../../services/products/editProductsCategories.service");
class EditProductsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { name, category_id, unit_id, sku, description, quantity } = req.body;
            const service = new editProductsCategories_service_1.EditProductService();
            const result = await service.execute({ id, name, description, category_id, unit_id, sku, quantity });
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.EditProductsController = EditProductsController;
