"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsController = void 0;
const listProduct_service_1 = require("../../services/products/listProduct.service");
class ListProductsController {
    async handle(req, res) {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = String(req.query.search || '');
            const service = new listProduct_service_1.ListProductService();
            return res.json(await service.execute({ page, limit, search }));
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ListProductsController = ListProductsController;
