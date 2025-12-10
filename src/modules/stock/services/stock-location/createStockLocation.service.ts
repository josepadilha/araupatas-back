import { AppDataSource } from "../../../../config/database";
import { StockLocation } from "../../entities/StockLocation";
import { StockMovement } from "../../entities/StockMovement";

interface IUnitRequest {
  name: string;
  description: string;
}

export class CreateStockLocationService {
  async execute({ name, description }: IUnitRequest) {

    const repo = AppDataSource.getRepository(StockLocation);

    const newLocation = repo.create({
      name,
      description
    });

    await repo.save(newLocation);

    return ;
  }
}
