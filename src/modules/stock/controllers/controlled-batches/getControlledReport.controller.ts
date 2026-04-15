import { Request, Response } from "express";
import { GetControlledReportService } from "../../services/controlled-batches/getControlledReport.service";

export class GetControlledReportController {
  async handle(req: Request, res: Response) {
    try {
      const { locationId } = req.params;
      const { month, year } = req.query;

      if (!month || !year) {
        return res.status(400).json({ message: "month e year são obrigatórios." });
      }

      const service = new GetControlledReportService();
      const report = await service.execute({
        locationId,
        month: Number(month),
        year: Number(year),
      });

      return res.status(200).json(report);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
