import { Request, Response } from "express";
import { ListProductService } from "../../services/products/listProduct.service";

export class ListProductsController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListProductService();
      const product = await service.execute();

      return res.status(200).json(product);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
