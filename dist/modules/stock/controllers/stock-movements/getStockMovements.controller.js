"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStockMovementsController = void 0;
const getStockMovements_service_1 = require("../../services/stock-movements/getStockMovements.service");
class GetStockMovementsController {
    async handle(req, res) {
        const { locationId, productId } = req.params;
        try {
            const service = new getStockMovements_service_1.GetStockMovementsService();
            const newStock = await service.execute({
                productId: productId,
                locationId: locationId
            });
            return res.status(201).json(newStock);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.GetStockMovementsController = GetStockMovementsController;
