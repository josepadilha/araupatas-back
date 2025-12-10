import { AppDataSource } from "../../../../config/database";
import { ProductUnit } from "../../entities/ProductUnit";

export class DeleteProductUnitService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(ProductUnit);

    const unit = await repo.findOne({ where: { id } });

    if (!unit) {
      throw new Error("Unit not found");
    }

    await repo.softRemove(unit);

    return { message: "Unit disabled" };
  }
}
