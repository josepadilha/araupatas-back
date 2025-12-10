
import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/products-category/listProductsCategories.service";

export class ListCategoriesController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListCategoriesService();
      const categories = await service.execute();

      return res.status(200).json(categories);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
