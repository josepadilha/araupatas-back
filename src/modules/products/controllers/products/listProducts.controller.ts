import { ListProductSelectService } from "../../services/products/listProductSelect.service";
import { Request, Response } from "express";

export class ListProductSelectController {
  async handle(req: Request, res: Response) {
    const search = String(req.query.search || '');

    const service = new ListProductSelectService();
    const products = await service.execute(search);

    return res.json(products);
  }
}
