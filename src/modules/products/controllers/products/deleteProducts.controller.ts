

import { Request, Response } from "express";
import { DeleteProductService } from "../../services/products/deleteProductsCategories.service";

export class DeleteProductsController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const service = new DeleteProductService();
            const result = await service.execute(id);

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
