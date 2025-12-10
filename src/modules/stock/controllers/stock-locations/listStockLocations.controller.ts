import { Request, Response } from "express";
import { ListStockLocationService } from "../../services/stock-location/listStockLocation.service";

export class ListStockLocationController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListStockLocationService();
      const locations = await service.execute();

      return res.status(200).json(locations);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}

