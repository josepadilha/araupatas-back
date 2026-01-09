"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductService = void 0;
const database_1 = require("../../../../config/database");
const Product_1 = require("../../entities/Product");
class ListProductService {
    async execute({ page = 1, limit = 10, search = '' }) {
        const repo = database_1.AppDataSource.getRepository(Product_1.Product);
        const qb = repo.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.unit', 'unit');
        if (search) {
            qb.andWhere(`
        LOWER(product.name) LIKE :search
        OR LOWER(product.description) LIKE :search
        OR LOWER(category.name) LIKE :search
        `, { search: `%${search.toLowerCase()}%` });
        }
        const [products, total] = await qb
            .orderBy('product.name', 'ASC')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data: products.map(product => {
                var _a, _b, _c, _d;
                return ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    sku: product.sku,
                    min_quantity: product.min_quantity,
                    category: (_a = product.category) === null || _a === void 0 ? void 0 : _a.name,
                    categoryId: (_b = product.category) === null || _b === void 0 ? void 0 : _b.id,
                    unitId: (_c = product.unit) === null || _c === void 0 ? void 0 : _c.id,
                    unit: (_d = product.unit) === null || _d === void 0 ? void 0 : _d.name,
                });
            }),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
}
exports.ListProductService = ListProductService;
