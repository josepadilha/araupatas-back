"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUnitsController = void 0;
const editProductsUnits_service_1 = require("../../services/products-unit/editProductsUnits.service");
class EditUnitsController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const service = new editProductsUnits_service_1.EditProductunitService();
            const result = await service.execute({ id, name, description });
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.EditUnitsController = EditUnitsController;
