"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStockMovementsService = void 0;
const database_1 = require("../../../../config/database");
const StockMovement_1 = require("../../entities/StockMovement");
class GetStockMovementsService {
    async execute({ productId, locationId }) {
        const movementRepo = database_1.AppDataSource.getRepository(StockMovement_1.StockMovement);
        const movements = await movementRepo.find({
            where: {
                location_id: locationId,
                product_id: productId,
            },
            relations: ['user']
        });
        return movements.map(m => ({
            id: m.id,
            productId: m.product_id,
            createdBy: m.user.name,
            quantity: m.quantity,
            type: m.type,
            date: m.createdAt,
            observation: ''
        }));
    }
}
exports.GetStockMovementsService = GetStockMovementsService;
