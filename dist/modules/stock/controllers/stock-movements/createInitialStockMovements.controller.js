"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInitialStockMovementsController = void 0;
const createInitialStockMovements_service_1 = require("../../services/stock-movements/createInitialStockMovements.service");
class CreateInitialStockMovementsController {
    async handle(req, res) {
        const { locationId, productId, quantity } = req.body;
        try {
            const service = new createInitialStockMovements_service_1.CreateInitialStockMovementsService();
            const userId = req.user.id;
            const newStock = await service.execute({
                productId, locationId, userId, quantity
            });
            return res.status(201).json(newStock);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateInitialStockMovementsController = CreateInitialStockMovementsController;
