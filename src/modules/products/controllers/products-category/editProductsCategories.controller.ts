

import { EditProductCategoryService } from "../../services/products-category/editProductsCategories.service";
import { Request, Response } from "express";

export class EditCategoriesController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const service = new EditProductCategoryService();
            const result = await service.execute({id, name, description});

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
