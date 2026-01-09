"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockLocationController = void 0;
const createStockLocation_service_1 = require("../../services/stock-location/createStockLocation.service");
class CreateStockLocationController {
    async handle(req, res) {
        const { name, description } = req.body;
        try {
            const service = new createStockLocation_service_1.CreateStockLocationService();
            const newStockLocation = await service.execute({
                description,
                name
            });
            return res.status(201).json(newStockLocation);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateStockLocationController = CreateStockLocationController;
