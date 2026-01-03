import { Request, Response } from "express";
import { CreateInitialStockMovementsService } from "../../services/stock-movements/createInitialStockMovements.service";

export class CreateInitialStockMovementsController {
    async handle(req: Request, res: Response) {
        const { locationId, productId, quantity } = req.body;

        try {

            const service = new CreateInitialStockMovementsService();

            const userId = req.user.id

            const newStock = await service.execute({
               productId, locationId, userId, quantity
            });

            return res.status(201).json(newStock);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
