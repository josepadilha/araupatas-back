"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStockLocationController = void 0;
const listStockLocation_service_1 = require("../../services/stock-location/listStockLocation.service");
class ListStockLocationController {
    async handle(req, res) {
        try {
            const service = new listStockLocation_service_1.ListStockLocationService();
            const locations = await service.execute();
            return res.status(200).json(locations);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ListStockLocationController = ListStockLocationController;
