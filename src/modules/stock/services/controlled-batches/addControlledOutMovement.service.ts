import { AppDataSource } from "../../../../config/database";
import { ControlledBatch } from "../../entities/ControlledBatch";
import { Stock } from "../../entities/Stock";
import { StockMovement } from "../../entities/StockMovement";

interface AddControlledOutMovementDTO {
  batchId: string;
  quantity: number;
  patientName: string;
  responsibleName: string;
  userId: string;
}

export class AddControlledOutMovementService {
  async execute({
    batchId,
    quantity,
    patientName,
    responsibleName,
    userId,
  }: AddControlledOutMovementDTO) {
    const batchRepo = AppDataSource.getRepository(ControlledBatch);

    const batch = await batchRepo.findOne({
      where: { id: batchId },
      relations: ["product", "location"],
    });
    if (!batch) throw new Error("Lote não encontrado.");
    if (!batch.product.is_controlled) throw new Error("Produto não é controlado.");
    if (batch.current_quantity < quantity) {
      throw new Error(
        `Quantidade insuficiente no lote. Disponível: ${batch.current_quantity}.`
      );
    }

    return await AppDataSource.transaction(async (manager) => {
      batch.current_quantity -= quantity;
      await manager.save(ControlledBatch, batch);

      const stock = await manager.findOne(Stock, {
        where: { product_id: batch.product_id, location_id: batch.location_id },
      });
      if (!stock || stock.quantity < quantity) {
        throw new Error("Quantidade insuficiente no estoque.");
      }
      stock.quantity -= quantity;
      await manager.save(Stock, stock);

      const movement = manager.create(StockMovement, {
        product_id: batch.product_id,
        location_id: batch.location_id,
        type: "OUT",
        quantity,
        created_by: userId,
        batch_id: batchId,
        patient_name: patientName,
        responsible_name: responsibleName,
      });
      await manager.save(StockMovement, movement);

      return movement;
    });
  }
}
