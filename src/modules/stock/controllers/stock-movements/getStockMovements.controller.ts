import { Request, Response } from "express";
import { GetStockMovementsService } from "../../services/stock-movements/getStockMovements.service";

export class GetStockMovementsController {
    async handle(req: Request, res: Response) {
        const { locationId, productId } = req.params;

        try {

            const service = new GetStockMovementsService();

            const newStock = await service.execute({
               productId: productId, 
               locationId: locationId
            });

            return res.status(201).json(newStock);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
