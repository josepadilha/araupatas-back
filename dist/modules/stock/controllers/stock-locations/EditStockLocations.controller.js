"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditStockLocationController = void 0;
const editStockLocation_service_1 = require("../../services/stock-location/editStockLocation.service");
class EditStockLocationController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const service = new editStockLocation_service_1.EditStockLocationService();
            const result = await service.execute({ id, name, description });
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.EditStockLocationController = EditStockLocationController;
