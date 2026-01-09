"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUnitsController = void 0;
const listProductsUnits_service_1 = require("../../services/products-unit/listProductsUnits.service");
class ListUnitsController {
    async handle(req, res) {
        try {
            const service = new listProductsUnits_service_1.ListUnitService();
            const units = await service.execute();
            return res.status(200).json(units);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ListUnitsController = ListUnitsController;
