import { AppDataSource } from "../../../../config/database";
import { StockLocation } from "../../entities/StockLocation";

export class ListStockLocationService {
  async execute() {
    const repo = AppDataSource.getRepository(StockLocation);

    const units = await repo.find();

    return units;
  }
}
