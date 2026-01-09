"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductSelectService = void 0;
const database_1 = require("../../../../config/database");
const Product_1 = require("../../entities/Product");
class ListProductSelectService {
    async execute(search = '') {
        const repo = database_1.AppDataSource.getRepository(Product_1.Product);
        const qb = repo.createQueryBuilder('product')
            .leftJoin('product.category', 'category')
            .leftJoin('product.unit', 'unit')
            .select([
            'product.id',
            'product.name',
            'category.name',
            'unit.name',
        ])
            .orderBy('product.name', 'ASC');
        if (search) {
            qb.where(`
        LOWER(product.name) LIKE :search
        OR LOWER(category.name) LIKE :search
      `, { search: `%${search.toLowerCase()}%` });
        }
        const products = await qb.getMany();
        return products.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category?.name,
            unit: p.unit?.name,
        }));
    }
}
exports.ListProductSelectService = ListProductSelectService;
