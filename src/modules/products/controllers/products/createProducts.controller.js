"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsController = void 0;
const createProduct_service_1 = require("../../services/products/createProduct.service");
class CreateProductsController {
    async handle(req, res) {
        try {
            const { name, description, sku, categoryId, unitId, quantity } = req.body;
            const service = new createProduct_service_1.CreateProductService();
            const product = await service.execute({
                name,
                description,
                sku,
                categoryId,
                unitId,
                quantity
            });
            return res.status(201).json(product);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateProductsController = CreateProductsController;
