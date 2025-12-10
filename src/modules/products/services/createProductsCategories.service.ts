import admin from "firebase-admin";
import { AppDataSource } from "../../../config/database";
import { ProductCategory } from "../entities/ProductCategory";

interface IRequest {
  name: string;
}

export class CreateProductCategoryService {
  async execute({ name }: IRequest) {

    const repo = AppDataSource.getRepository(ProductCategory);

    const newCategory = repo.create({
      name,
    });

    await repo.save(newCategory);

    return newCategory;
  }
}
