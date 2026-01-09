"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStockByProductController = void 0;
const getStockByProductId_service_1 = require("../../services/stock/getStockByProductId.service");
class GetStockByProductController {
    async handle(req, res) {
        try {
            const { locationId } = req.params;
            const { productId } = req.params;
            const service = new getStockByProductId_service_1.GetStockByProductIdService();
            const product = await service.execute(locationId, productId);
            return res.status(200).json(product);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.GetStockByProductController = GetStockByProductController;
