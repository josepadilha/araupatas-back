"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStockByProductIdService = void 0;
const database_1 = require("../../../../config/database");
const Stock_1 = require("../../entities/Stock");
class GetStockByProductIdService {
    async execute(locationId, productId) {
        const repo = database_1.AppDataSource.getRepository(Stock_1.Stock);
        const stock = await repo.findOne({
            where: {
                location_id: locationId,
                product_id: productId
            },
            relations: {
                product: {
                    category: true,
                    unit: true
                }
            },
            order: {
                updatedAt: 'DESC'
            }
        });
        if (!stock) {
            throw new Error("Product not found.");
        }
        return {
            id: stock.product.id,
            name: stock.product.name,
            category: stock.product.category?.name ?? '',
            unit: stock.product.unit?.name ?? '',
            currentQuantity: stock.quantity,
            warehouseId: stock.location_id,
        };
    }
}
exports.GetStockByProductIdService = GetStockByProductIdService;
