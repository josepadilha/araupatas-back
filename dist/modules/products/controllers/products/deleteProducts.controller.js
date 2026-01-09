"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductsController = void 0;
const deleteProductsCategories_service_1 = require("../../services/products/deleteProductsCategories.service");
class DeleteProductsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const service = new deleteProductsCategories_service_1.DeleteProductService();
            const result = await service.execute(id);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.DeleteProductsController = DeleteProductsController;
