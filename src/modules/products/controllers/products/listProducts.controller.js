"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductSelectController = void 0;
const listProductSelect_service_1 = require("../../services/products/listProductSelect.service");
class ListProductSelectController {
    async handle(req, res) {
        const search = String(req.query.search || '');
        const service = new listProductSelect_service_1.ListProductSelectService();
        const products = await service.execute(search);
        return res.json(products);
    }
}
exports.ListProductSelectController = ListProductSelectController;
