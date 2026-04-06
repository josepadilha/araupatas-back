import { AppDataSource } from "../../../../config/database";
import { StockLocation } from "../../entities/StockLocation";

export class ListStockLocationService {
  async execute() {
    const repo = AppDataSource.getRepository(StockLocation);

    const locations = await repo
      .createQueryBuilder("location")
      .leftJoin("stock", "s", "s.location_id = location.id AND s.deletedAt IS NULL")
      .leftJoin("products", "p", "p.id = s.product_id AND p.deletedAt IS NULL")
      .select("location.id", "id")
      .addSelect("location.name", "name")
      .addSelect("location.description", "description")
      .addSelect("location.createdAt", "createdAt")
      .addSelect("location.updatedAt", "updatedAt")
      .addSelect("COALESCE(SUM(s.quantity * p.price), 0)", "totalValue")
      .where("location.deletedAt IS NULL")
      .groupBy("location.id")
      .getRawMany();

    return locations.map(l => ({
      ...l,
      totalValue: Number(l.totalValue),
    }));
  }
}
