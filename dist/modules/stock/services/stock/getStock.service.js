"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStockService = void 0;
const database_1 = require("../../../../config/database");
const Stock_1 = require("../../entities/Stock");
const StockMovement_1 = require("../../entities/StockMovement");
class GetStockService {
    async execute({ locationId, page = 1, limit = 10, search = '', }) {
        const qb = database_1.AppDataSource
            .getRepository(Stock_1.Stock)
            .createQueryBuilder('stock')
            .select([
            'stock.id',
            'stock.quantity',
            'stock.location_id',
            'product.id',
            'product.name',
            'product.min_quantity',
            'category.name',
            'unit.name',
        ])
            .leftJoin('stock.product', 'product')
            .leftJoin('product.category', 'category')
            .leftJoin('product.unit', 'unit')
            // 🔹 Última entrada
            .addSelect(subQuery => subQuery
            .select('MAX(movement.createdAt)')
            .from(StockMovement_1.StockMovement, 'movement')
            .where('movement.product_id = stock.product_id')
            .andWhere('movement.location_id = stock.location_id')
            .andWhere('movement.type = :inType'), 'lastEntry')
            .addSelect(subQuery => subQuery
            .select('MAX(movement.createdAt)')
            .from(StockMovement_1.StockMovement, 'movement')
            .where('movement.product_id = stock.product_id')
            .andWhere('movement.location_id = stock.location_id')
            .andWhere('movement.type = :outType'), 'lastExit')
            .where('stock.location_id = :locationId', { locationId })
            .setParameters({
            inType: 'IN',
            outType: 'OUT',
        });
        if (search) {
            qb.andWhere(`
        LOWER(product.name) LIKE :search
        OR LOWER(category.name) LIKE :search
      `, { search: `%${search.toLowerCase()}%` });
        }
        const countQb = database_1.AppDataSource
            .getRepository(Stock_1.Stock)
            .createQueryBuilder('stock')
            .leftJoin('stock.product', 'product')
            .leftJoin('product.category', 'category')
            .where('stock.location_id = :locationId', { locationId });
        if (search) {
            countQb.andWhere(`
        LOWER(product.name) LIKE :search
        OR LOWER(category.name) LIKE :search
      `, { search: `%${search.toLowerCase()}%` });
        }
        const total = await countQb.getCount();
        const dataQb = qb.clone()
            .orderBy('product.name', 'ASC')
            .skip((page - 1) * limit)
            .take(limit);
        const entities = await dataQb.getMany();
        const raw = await dataQb.getRawMany();
        return {
            data: entities.map((stock, index) => ({
                id: stock.product.id,
                name: stock.product.name,
                category: stock.product.category?.name ?? '',
                unit: stock.product.unit?.name ?? '',
                currentQuantity: stock.quantity,
                min_quantity: stock.product.min_quantity,
                warehouseId: stock.location_id,
                lastEntry: raw[index]?.lastEntry ?? null,
                lastExit: raw[index]?.lastExit ?? null,
            })),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
}
exports.GetStockService = GetStockService;
