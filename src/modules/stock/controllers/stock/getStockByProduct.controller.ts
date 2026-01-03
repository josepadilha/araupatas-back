import { Request, Response } from "express";
import { GetStockByProductIdService } from "../../services/stock/getStockByProductId.service";

export class GetStockByProductController {
  async handle(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      const { productId } = req.params;

      const service = new GetStockByProductIdService();
      const product = await service.execute(locationId, productId);

      return res.status(200).json(product);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
