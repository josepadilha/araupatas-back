"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockController = void 0;
const createStock_service_1 = require("../../services/stock/createStock.service");
class CreateStockController {
    async handle(req, res) {
        const { locationId, productId } = req.body;
        try {
            const service = new createStock_service_1.CreateStockService();
            const newStock = await service.execute({
                locationId,
                productId
            });
            return res.status(201).json(newStock);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateStockController = CreateStockController;
