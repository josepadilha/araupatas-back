import { Request, Response } from "express";
import { CreateStockMovementsService } from "../../services/stock-movements/createStockMovements.service";

export class CreateStockMovementsController {
    async handle(req: Request, res: Response) {
        const { locationId, productId, type, quantity } = req.body;

        try {

            const service = new CreateStockMovementsService();

            const userId = req.user.id

            const newStock = await service.execute({
                productId, locationId, type, userId, quantity
            });

            return res.status(201).json(newStock);

        } catch (err: any) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
