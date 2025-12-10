import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/createProduct.service";

export class CreateProductsController {
  async handle(req: Request, res: Response) {
    try {
      const { 
        name,
        description,
        sku,
        categoryId,
        unitId
      } = req.body;

      const service = new CreateProductService();

      const product = await service.execute({
        name,
        description,
        sku,
        categoryId,
        unitId
      });

      return res.status(201).json(product);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
