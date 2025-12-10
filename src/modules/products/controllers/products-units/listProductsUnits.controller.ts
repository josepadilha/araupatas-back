
import { Request, Response } from "express";
import { ListUnitService } from "../../services/products-unit/listProductsUnits.service";

export class ListUnitsController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListUnitService();
      const units = await service.execute();

      return res.status(200).json(units);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
