import { Request, Response } from "express";
import { UpdateProductPriceService } from "../../services/products/updateProductPrice.service";

export class UpdateProductPriceController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { price } = req.body;

      if (price === undefined || isNaN(Number(price))) {
        return res.status(400).json({ error: "Preço inválido." });
      }

      const service = new UpdateProductPriceService();
      const result = await service.execute({ id, price: Number(price) });

      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
