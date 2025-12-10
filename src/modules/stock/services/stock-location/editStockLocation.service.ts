import { AppDataSource } from "../../../../config/database";
import { StockLocation } from "../../entities/StockLocation";

interface IRequest {
  id: string;
  name: string;
  description: string
}

export class EditStockLocationService {
  async execute({ id, name, description }: IRequest) {
    const repo = AppDataSource.getRepository(StockLocation);

    const location = await repo.findOne({ where: { id } });

    if (!location) {
      throw new Error("Location not found.");
    }

    const existing = await repo.findOne({
      where: { name }
    });

    if (existing && existing.id !== id) {
      throw new Error("Location already exists");
    }

    location.name = name ? name : location.name;
    location.description = description ? description : location.description;

    await repo.update(id, location);

    return location;
  }
}
