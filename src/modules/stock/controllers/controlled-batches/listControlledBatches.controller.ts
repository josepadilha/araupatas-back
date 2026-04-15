import { Request, Response } from "express";
import { ListControlledBatchesService } from "../../services/controlled-batches/listControlledBatches.service";

export class ListControlledBatchesController {
  async handle(req: Request, res: Response) {
    console.log('chamando rota')
    try {
      const { locationId } = req.params;
      const { productId } = req.query;

      const service = new ListControlledBatchesService();
      const batches = await service.execute({
        locationId,
        productId: productId as string | undefined,
      });

      return res.status(200).json(batches);
    } catch (error: any) {
      console.log('error:', error)
      return res.status(400).json({ message: error.message });
    }
  }
}
