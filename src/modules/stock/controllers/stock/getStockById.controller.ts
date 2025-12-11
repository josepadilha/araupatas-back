import { Request, Response } from "express";
import { getStockService } from "../../services/stock/getStock.service";

export class ListStockController {
  async handle(req: Request, res: Response) {
    try {
      const { locationId } = req.params;

      const service = new getStockService();
      const product = await service.execute(locationId);

      return res.status(200).json(product);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
