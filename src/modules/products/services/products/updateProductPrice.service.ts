import { AppDataSource } from "../../../../config/database";
import { Product } from "../../entities/Product";

export class UpdateProductPriceService {
  async execute({ id, price }: { id: string; price: number }) {
    const repo = AppDataSource.getRepository(Product);

    const product = await repo.findOne({ where: { id } });

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    product.price = price;
    await repo.save(product);

    return product;
  }
}
