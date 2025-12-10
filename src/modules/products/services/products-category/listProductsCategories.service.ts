import { AppDataSource } from "../../../../config/database";
import { ProductCategory } from "../../entities/ProductCategory";

export class ListCategoriesService {
  async execute() {
    const repo = AppDataSource.getRepository(ProductCategory);

    const categories = await repo.find();

    return categories;
  }
}

