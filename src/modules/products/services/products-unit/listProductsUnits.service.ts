import { AppDataSource } from "../../../../config/database";
import { ProductUnit } from "../../entities/ProductUnit";

export class ListUnitService {
  async execute() {
    const repo = AppDataSource.getRepository(ProductUnit);

    const units = await repo.find();

    return units;
  }
}

