import { Request, Response } from "express";
import { GetStockService } from "../../services/stock/getStock.service";

export class ListStockController {
  async handle(req: Request, res: Response) {
    try {

      const { locationId } = req.params;

      if (!locationId) {
       return res.status(400).json({ error: 'locationId is required' });
      }

      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const search = String(req.query.search || '');

      const service = new GetStockService();
      const product = await service.execute({ locationId, page, limit, search });

      return res.status(200).json(product);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
