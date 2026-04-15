import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";
import { ProductCategory } from "../../entities/ProductCategory";
import { ProductUnit } from "../../entities/ProductUnit";

interface IRequest {
  id: string;
  name: string;
  description: string;
  category_id: string;
  unit_id: string;
  sku: string;
  price?: number;
  quantity: number;
  is_controlled?: boolean;
}

export class EditProductService {
  async execute({ id, name, description, category_id, unit_id, sku, price, quantity, is_controlled }: IRequest) {
    const repo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(ProductCategory);
    const unitRepo = AppDataSource.getRepository(ProductUnit);

    const product =  await repo.findOne({ where: { id } });
    
    if (!product) {
      throw new Error("Category not found.");
    }

    const category = await categoryRepo.findOne({ where: { id: category_id } });

    if (!category) {
      throw new Error("Category not found.");
    }

    const unit = await unitRepo.findOne({ where: { id: unit_id } });

    if (!unit) {
      throw new Error("Unit not found.");
    }

    product.name = name;
    product.description = description ? description : product.description;
    product.sku = sku ? sku : product.sku;
    product.price = price !== undefined ? price : product.price;
    product.min_quantity = quantity ? quantity : product.min_quantity;
    product.category_id = category_id ? category_id : product.category_id;
    product.unit_id = unit_id ? unit_id : product.unit_id;
    if (is_controlled !== undefined) product.is_controlled = is_controlled;

    await repo.update(id, product);

    return product;
  }
}
