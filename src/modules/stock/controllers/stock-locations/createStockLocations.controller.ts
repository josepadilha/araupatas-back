import { Request, Response } from "express";
import { CreateStockLocationService } from "../../services/stock-location/createStockLocation.service";

export class CreateStockLocationController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const service = new CreateStockLocationService();

      const newStockLocation = await service.execute({
        description,
        name
    });

      return res.status(201).json(newStockLocation);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}

