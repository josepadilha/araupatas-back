import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";

export class ListProductService {
  async execute() {
    const repo = AppDataSource.getRepository(Product);

    const products = await repo.find();

    return products;
  }
}
