"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInitialStockMovementsService = void 0;
const database_1 = require("../../../../config/database");
const Stock_1 = require("../../entities/Stock");
const StockMovement_1 = require("../../entities/StockMovement");
class CreateInitialStockMovementsService {
    async execute({ productId, locationId, userId, quantity }) {
        return await database_1.AppDataSource.transaction(async (manager) => {
            const stockRepo = manager.getRepository(Stock_1.Stock);
            const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
            let stock = await stockRepo.findOne({
                where: { product_id: productId, location_id: locationId }
            });
            if (stock) {
                throw new Error("Produto já está  cadastrado nesse estoque.");
            }
            const newStock = stockRepo.create({
                location_id: locationId,
                product_id: productId,
                quantity
            });
            stockRepo.save(newStock);
            const movement = movementRepo.create({
                type: 'IN',
                created_by: userId,
                location_id: locationId,
                product_id: productId,
                quantity
            });
            await movementRepo.save(movement);
            return movement;
        });
    }
}
exports.CreateInitialStockMovementsService = CreateInitialStockMovementsService;
