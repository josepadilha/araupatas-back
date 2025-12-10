import { AppDataSource } from "../../../../config/database";
import { StockMovement } from "../../entities/StockMovement";

interface IUnitRequest {
  name: string;
  description: string;
}

export class CreateStockMovementsService {
  async execute({ name, description }: IUnitRequest) {

    const repo = AppDataSource.getRepository(StockMovement);

    // const newUnit = repo.create({
    //   name
    // });

    // await repo.save(newUnit);

    return ;
  }
}
