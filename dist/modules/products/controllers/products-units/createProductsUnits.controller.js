"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsUnitsController = void 0;
const createProductsIUnits_service_1 = require("../../services/products-unit/createProductsIUnits.service");
class CreateProductsUnitsController {
    async handle(req, res) {
        const { name, description } = req.body;
        try {
            const service = new createProductsIUnits_service_1.CreateProductUnitService();
            const newUnit = await service.execute({
                name,
                description
            });
            return res.status(201).json(newUnit);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateProductsUnitsController = CreateProductsUnitsController;
