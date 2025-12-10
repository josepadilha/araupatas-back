import { AppDataSource } from "../../../../config/database";
import { ProductUnit } from "../../entities/ProductUnit";

interface IUnitRequest {
  id: string;
  name: string;
  description: string
}

export class EditProductunitService {
  async execute({ id, name, description }: IUnitRequest) {
    const repo = AppDataSource.getRepository(ProductUnit);

    const unit = await repo.findOne({ where: { id } });

    if (!unit) {
      throw new Error("Unit not found.");
    }

    const existing = await repo.findOne({
      where: { name }
    });

    if (existing && existing.id !== id) {
      throw new Error("Unit already exists");
    }

    unit.name = name;

    await repo.update(id, { name });

    return unit;
  }
}
