"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockMovementsController = void 0;
const createStockMovements_service_1 = require("../../services/stock-movements/createStockMovements.service");
class CreateStockMovementsController {
    async handle(req, res) {
        const { locationId, productId, type, quantity } = req.body;
        try {
            const service = new createStockMovements_service_1.CreateStockMovementsService();
            const userId = req.user.id;
            const newStock = await service.execute({
                productId, locationId, type, userId, quantity
            });
            return res.status(201).json(newStock);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateStockMovementsController = CreateStockMovementsController;
