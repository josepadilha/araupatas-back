import { AppDataSource } from "../../../../config/database";
import { StockMovement } from "../../entities/StockMovement";
import { ControlledBatch } from "../../entities/ControlledBatch";
import { Product } from "../../../products/entities/Product";

interface GetControlledReportDTO {
  month: number; // 1–12
  year: number;
  locationId: string;
}

export class GetControlledReportService {
  async execute({ month, year, locationId }: GetControlledReportDTO) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    // Busca todos os produtos controlados com lotes na localização
    const batchRepo = AppDataSource.getRepository(ControlledBatch);
    const movementRepo = AppDataSource.getRepository(StockMovement);

    const batches = await batchRepo
      .createQueryBuilder("batch")
      .leftJoinAndSelect("batch.product", "product")
      .leftJoinAndSelect("product.unit", "unit")
      .where("batch.location_id = :locationId", { locationId })
      .getMany();

    // Agrupa lotes por produto
    const productMap = new Map<string, typeof batches>();
    for (const batch of batches) {
      const list = productMap.get(batch.product_id) ?? [];
      list.push(batch);
      productMap.set(batch.product_id, list);
    }

    const report = [];

    for (const [productId, productBatches] of productMap) {
      const product = productBatches[0].product;
      const batchReports = [];

      for (const batch of productBatches) {
        // Movimentos do lote no mês
        const movements = await movementRepo
          .createQueryBuilder("m")
          .leftJoinAndSelect("m.user", "user")
          .where("m.batch_id = :batchId", { batchId: batch.id })
          .andWhere("m.createdAt >= :startDate", { startDate })
          .andWhere("m.createdAt < :endDate", { endDate })
          .orderBy("m.createdAt", "ASC")
          .getMany();

        // Saldo de abertura = current_quantity + soma das saídas do mês - soma das entradas do mês
        const monthIn = movements
          .filter((m) => m.type === "IN")
          .reduce((sum, m) => sum + m.quantity, 0);
        const monthOut = movements
          .filter((m) => m.type === "OUT")
          .reduce((sum, m) => sum + m.quantity, 0);
        const openingBalance = batch.current_quantity - monthIn + monthOut;

        batchReports.push({
          batchId: batch.id,
          batchNumber: batch.batch_number,
          expirationDate: batch.expiration_date,
          nfNumber: batch.nf_number ?? null,
          openingBalance,
          closingBalance: batch.current_quantity,
          movements: movements.map((m) => ({
            id: m.id,
            type: m.type,
            quantity: m.quantity,
            patientName: m.patient_name ?? null,
            responsibleName: m.responsible_name ?? null,
            createdBy: m.user?.name ?? null,
            date: m.createdAt,
            observation: m.observation ?? null,
          })),
        });
      }

      report.push({
        productId,
        productName: product.name,
        unit: product.unit?.name ?? null,
        batches: batchReports,
      });
    }

    return {
      month,
      year,
      locationId,
      products: report,
    };
  }
}
