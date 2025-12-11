import { AppDataSource } from "../../../../config/database";
import { Product } from "../../../products/entities/Product";
import { Stock } from "../../entities/Stock";
import { StockLocation } from "../../entities/StockLocation";
interface IRequest {
  locationId: string;
  productId: string;
}

export class CreateStockService {
  async execute({ locationId, productId }: IRequest) {
    const repo = AppDataSource.getRepository(Stock);
    const stockLocationRepo = AppDataSource.getRepository(StockLocation);
    const productRepo = AppDataSource.getRepository(Product);

    const location = await stockLocationRepo.findOne({ where: { id: locationId } });
    if (!location) {
      throw new Error("Location not found.");
    }

    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error("Product not found.");
    }

    const stock = repo.create({
        location_id: locationId,
        product_id: productId,
        quantity: 0
    });

    await repo.save(stock);

    return stock;
  }
}
