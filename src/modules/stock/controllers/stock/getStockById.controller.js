"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStockController = void 0;
const getStock_service_1 = require("../../services/stock/getStock.service");
class ListStockController {
    async handle(req, res) {
        try {
            const { locationId } = req.params;
            if (!locationId) {
                return res.status(400).json({ error: 'locationId is required' });
            }
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = String(req.query.search || '');
            const service = new getStock_service_1.GetStockService();
            const product = await service.execute({ locationId, page, limit, search });
            return res.status(200).json(product);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ListStockController = ListStockController;
