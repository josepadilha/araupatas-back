import { Request, Response } from "express";
import { AddControlledOutMovementService } from "../../services/controlled-batches/addControlledOutMovement.service";

export class AddControlledOutMovementController {
  async handle(req: Request, res: Response) {
    try {
      const { batchId, quantity, patientName, responsibleName } = req.body;
      const userId = req.user.id;

      const service = new AddControlledOutMovementService();
      const movement = await service.execute({
        batchId,
        quantity: Number(quantity),
        patientName,
        responsibleName,
        userId,
      });

      return res.status(201).json(movement);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
