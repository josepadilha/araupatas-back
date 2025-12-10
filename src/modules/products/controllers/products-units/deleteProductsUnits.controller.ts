
import { Request, Response } from "express";
import { DeleteProductUnitService } from "../../services/products-unit/deleteProductsUnits.service";

export class DeleteUnitsController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const service = new DeleteProductUnitService();
            const result = await service.execute(id);

            return res.status(200).json(result);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
