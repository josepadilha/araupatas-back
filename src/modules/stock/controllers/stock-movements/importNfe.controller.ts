import { Request, Response } from "express";
import { ImportNfeService } from "../../services/stock-movements/importNfe.service";

export class ImportNfeController {
  async handle(req: Request, res: Response) {
    const { entries, observation } = req.body;

    if (!Array.isArray(entries) || !entries.length) {
      return res.status(400).json({ error: "Nenhum item enviado para importação." });
    }

    try {
      const service = new ImportNfeService();
      await service.execute({ entries, observation, userId: req.user.id });
      return res.status(201).json({ message: "Importação concluída com sucesso." });
    } catch (err: any) {
      return res.status(400).json({ error: err.message || "Erro na importação." });
    }
  }
}
