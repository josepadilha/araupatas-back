

import { Request, Response } from "express";
import { EditProductService } from "../../services/products/editProductsCategories.service";

export class EditProductsController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, categoryId, unitId, sku, price, description, quantity, is_controlled } = req.body;

            const service = new EditProductService();
            const result = await service.execute({ id, name, description, category_id: categoryId, unit_id: unitId, sku, price, quantity, is_controlled });

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
