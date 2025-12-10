import { Request, Response } from "express";
import { CreateProductCategoryService } from "../../services/products-category/createProductsCategories.service";

export class CreateProductsCategoriesController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const service = new CreateProductCategoryService();

      const newCategory = await service.execute({
        name
      });

      return res.status(201).json(newCategory);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
