import { AppDataSource } from "../../../../config/database";
import { ProductCategory } from "../../entities/ProductCategory";

interface IRequest {
  id: string;
  name: string;
  description: string
}

export class EditProductCategoryService {
  async execute({ id, name }: IRequest) {
    const repo = AppDataSource.getRepository(ProductCategory);

    const category = await repo.findOne({ where: { id } });

    if (!category) {
      throw new Error("Categoria not found.");
    }

    const existing = await repo.findOne({
      where: { name }
    });

    if (existing && existing.id !== id) {
      throw new Error("Category already exists");
    }

    category.name = name;

    await repo.update(id, { name });

    return category;
  }
}
