import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";

export class ListProductService {
  async execute({
    page = 1,
    limit = 10,
    search = ''
  }: {
    page: number;
    limit: number;
    search: string;
  }) {
    const repo = AppDataSource.getRepository(Product);

    const qb = repo.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.unit', 'unit');

    if (search) {
      qb.andWhere(
        `
        LOWER(product.name) LIKE :search
        OR LOWER(product.description) LIKE :search
        OR LOWER(category.name) LIKE :search
        `,
        { search: `%${search.toLowerCase()}%` }
      );
    }

    const [products, total] = await qb
      .orderBy('product.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        min_quantity: product.min_quantity,
        category: product.category?.name,
        categoryId: product.category?.id,
        unitId: product.unit?.id,
        unit: product.unit?.name,
      })),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

