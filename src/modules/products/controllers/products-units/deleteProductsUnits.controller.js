"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUnitsController = void 0;
const deleteProductsUnits_service_1 = require("../../services/products-unit/deleteProductsUnits.service");
class DeleteUnitsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const service = new deleteProductsUnits_service_1.DeleteProductUnitService();
            const result = await service.execute(id);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.DeleteUnitsController = DeleteUnitsController;
