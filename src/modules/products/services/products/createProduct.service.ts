import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";
import { ProductCategory } from "../../entities/ProductCategory";
import { ProductUnit } from "../../entities/ProductUnit";

interface IRequest {
  name: string;
  description?: string;
  sku?: string;
  price?: number;
  categoryId: string;
  unitId: string;
  quantity: number;
  is_controlled?: boolean;
}

export class CreateProductService {
  async execute({ name, description, sku, price, categoryId, unitId, quantity, is_controlled }: IRequest) {
    const repo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(ProductCategory);
    const unitRepo = AppDataSource.getRepository(ProductUnit);

    const category = await categoryRepo.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new Error("Category not found.");
    }

    const unit = await unitRepo.findOne({ where: { id: unitId } });
    if (!unit) {
      throw new Error("Unit not found.");
    }

    const product = repo.create({
      name,
      description,
      sku,
      price,
      category_id: category.id,
      unit_id: unit.id,
      min_quantity: quantity,
      is_controlled: is_controlled ?? false,
    });

    await repo.save(product);

    return product;
  }
}
