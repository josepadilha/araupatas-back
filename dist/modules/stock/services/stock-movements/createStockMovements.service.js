"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockMovementsService = void 0;
const database_1 = require("../../../../config/database");
const Stock_1 = require("../../entities/Stock");
const StockMovement_1 = require("../../entities/StockMovement");
class CreateStockMovementsService {
    async execute({ productId, locationId, type, userId, quantity }) {
        return await database_1.AppDataSource.transaction(async (manager) => {
            const stockRepo = manager.getRepository(Stock_1.Stock);
            const movementRepo = manager.getRepository(StockMovement_1.StockMovement);
            let stock = await stockRepo.findOne({
                where: { product_id: productId, location_id: locationId }
            });
            if (!stock) {
                throw new Error("Produto não cadastrado nesse estoque.");
            }
            if (type === "IN") {
                stock.quantity += quantity;
            }
            if (type === "OUT") {
                if (stock.quantity < quantity) {
                    throw new Error("Estoque insuficiente");
                }
                stock.quantity -= quantity;
            }
            await stockRepo.save(stock);
            console.log('NOW Date():', new Date());
            console.log('NOW ISO:', new Date().toISOString());
            console.log('NOW locale:', new Date().toLocaleString('pt-BR'));
            const movement = movementRepo.create({
                type,
                created_by: userId,
                location_id: locationId,
                product_id: productId,
                quantity,
            });
            await movementRepo.save(movement);
            return movement;
        });
    }
}
exports.CreateStockMovementsService = CreateStockMovementsService;
