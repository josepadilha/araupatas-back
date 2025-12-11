import { AppDataSource } from "../../../../config/database";
import { Stock } from "../../entities/Stock";

export class getStockService {
  async execute(locationId: string) {
    const repo = AppDataSource.getRepository(Stock);

    const stock = await repo.find({
      where: {
        location_id: locationId
      }
    });

    return stock;
  }
}
