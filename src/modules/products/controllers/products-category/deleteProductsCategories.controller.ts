
import { DeleteProductCategoryService } from "../../services/products-category/deleteProductsCategories.service";
import { Request, Response } from "express";

export class DeleteCategoriesController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const service = new DeleteProductCategoryService();
            const result = await service.execute(id);

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
