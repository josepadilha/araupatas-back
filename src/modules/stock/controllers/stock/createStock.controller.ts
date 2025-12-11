import { Request, Response } from "express";
import { CreateStockService } from "../../services/stock/createStock.service";

export class CreateStockController {
  async handle(req: Request, res: Response) {
    const { locationId, productId} = req.body;

    try {
      const service = new CreateStockService();

      const newStock = await service.execute({
        locationId,
        productId
      });

      return res.status(201).json(newStock);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
