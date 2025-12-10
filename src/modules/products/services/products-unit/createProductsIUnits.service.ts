import { AppDataSource } from "../../../../config/database";
import { ProductUnit } from "../../entities/ProductUnit";

interface IUnitRequest {
  name: string;
  description: string;
}

export class CreateProductUnitService {
  async execute({ name, description }: IUnitRequest) {

    const repo = AppDataSource.getRepository(ProductUnit);

    const newUnit = repo.create({
      name
    });

    await repo.save(newUnit);

    return newUnit;
  }
}
