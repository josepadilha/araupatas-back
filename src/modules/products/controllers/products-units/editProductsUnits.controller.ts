

import { Request, Response } from "express";
import { EditProductunitService } from "../../services/products-unit/editProductsUnits.service";

export class EditUnitsController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const service = new EditProductunitService();
            const result = await service.execute({id, name, description});

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
