import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";

export class ListProductService {
  async execute() {
    const repo = AppDataSource.getRepository(Product);

    const products = await repo.find({
      relations: ['category', 'unit']
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      sku: product.sku,
      min_quantity: product.min_quantity,
      category: product.category?.name,
      unit: product.unit?.name,
    }));
  }
}
