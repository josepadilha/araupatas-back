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
            data: entities.map((stock, index) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return ({
                    id: stock.product.id,
                    name: stock.product.name,
                    category: (_b = (_a = stock.product.category) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                    unit: (_d = (_c = stock.product.unit) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '',
                    currentQuantity: stock.quantity,
                    min_quantity: stock.product.min_quantity,
                    warehouseId: stock.location_id,
                    lastEntry: (_f = (_e = raw[index]) === null || _e === void 0 ? void 0 : _e.lastEntry) !== null && _f !== void 0 ? _f : null,
                    lastExit: (_h = (_g = raw[index]) === null || _g === void 0 ? void 0 : _g.lastExit) !== null && _h !== void 0 ? _h : null,
                });
            }),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
}
exports.GetStockService = GetStockService;
