import { Request, Response } from "express";
import { CreateProductUnitService } from "../../services/products-unit/createProductsIUnits.service";

export class CreateProductsUnitsController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const service = new CreateProductUnitService();

      const newUnit = await service.execute({
        name,
        description
      });

      return res.status(201).json(newUnit);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
