import { Request, Response } from "express";
import { ListProductService } from "../../services/products/listProduct.service";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const search = String(req.query.search || '');

      const service = new ListProductService();
      return res.json(await service.execute({ page, limit, search }));

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
