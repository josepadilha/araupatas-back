import { AppDataSource } from "../../../../config/database";
import { ProductCategory } from "../../entities/ProductCategory";

export class DeleteProductCategoryService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(ProductCategory);

    const category = await repo.findOne({ where: { id } });

    if (!category) {
      throw new Error("Category not found");
    }

    await repo.softRemove(category);

    return { message: "Category disabled" };
  }
}
