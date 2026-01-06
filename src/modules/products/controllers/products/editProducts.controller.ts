

import { Request, Response } from "express";
import { EditProductService } from "../../services/products/editProductsCategories.service";

export class EditProductsController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name,  category_id, unit_id, sku, description, quantity } = req.body;

            const service = new EditProductService();
            const result = await service.execute({id, name, description, category_id, unit_id, sku, quantity});

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
