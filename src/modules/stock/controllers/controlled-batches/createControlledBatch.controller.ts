import { Request, Response } from "express";
import { CreateControlledBatchService } from "../../services/controlled-batches/createControlledBatch.service";

export class CreateControlledBatchController {
  async handle(req: Request, res: Response) {
    try {
      const { productId, locationId, batchNumber, expirationDate, quantity, nfNumber } = req.body;
      const userId = req.user.id;

      const service = new CreateControlledBatchService();
      const batch = await service.execute({
        productId,
        locationId,
        batchNumber,
        expirationDate,
        quantity: Number(quantity),
        nfNumber,
        userId,
      });

      return res.status(201).json(batch);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
