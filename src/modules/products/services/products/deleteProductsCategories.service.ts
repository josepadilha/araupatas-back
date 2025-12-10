import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";
import { ProductCategory } from "../../entities/ProductCategory";
import { ProductUnit } from "../../entities/ProductUnit";


export class DeleteProductService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(Product);

    const product =  await repo.findOne({ where: { id } });
    
    if (!product) {
      throw new Error("Category not found.");
    }

    await repo.softRemove(product);

    return product;
  }
}
