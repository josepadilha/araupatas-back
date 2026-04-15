import { AppDataSource } from "../../../../config/database";
import { ControlledBatch } from "../../entities/ControlledBatch";
import { Stock } from "../../entities/Stock";
import { StockMovement } from "../../entities/StockMovement";
import { Product } from "../../../products/entities/Product";
import { StockLocation } from "../../entities/StockLocation";

interface CreateControlledBatchDTO {
  productId: string;
  locationId: string;
  batchNumber: string;
  expirationDate: string;
  quantity: number;
  nfNumber?: string;
  userId: string;
}

export class CreateControlledBatchService {
  async execute({
    productId,
    locationId,
    batchNumber,
    expirationDate,
    quantity,
    nfNumber,
    userId,
  }: CreateControlledBatchDTO) {
    const productRepo = AppDataSource.getRepository(Product);
    const locationRepo = AppDataSource.getRepository(StockLocation);

    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error("Produto não encontrado.");
    if (!product.is_controlled) throw new Error("Produto não é controlado.");

    const location = await locationRepo.findOne({ where: { id: locationId } });
    if (!location) throw new Error("Localização não encontrada.");

    return await AppDataSource.transaction(async (manager) => {
      const batch = manager.create(ControlledBatch, {
        product_id: productId,
        location_id: locationId,
        batch_number: batchNumber,
        expiration_date: expirationDate,
        initial_quantity: quantity,
        current_quantity: quantity,
        nf_number: nfNumber,
      });
      await manager.save(ControlledBatch, batch);

      // Atualiza ou cria o saldo no stock
      let stock = await manager.findOne(Stock, {
        where: { product_id: productId, location_id: locationId },
      });

      if (!stock) {
        stock = manager.create(Stock, {
          product_id: productId,
          location_id: locationId,
          quantity: 0,
        });
      }
      stock.quantity = stock.quantity + quantity;
      await manager.save(Stock, stock);

      const movement = manager.create(StockMovement, {
        product_id: productId,
        location_id: locationId,
        type: "IN",
        quantity,
        created_by: userId,
        batch_id: batch.id,
        observation: `Lote: ${batchNumber} | Validade: ${expirationDate}${nfNumber ? ` | NF: ${nfNumber}` : ""}`,
      });
      await manager.save(StockMovement, movement);

      return batch;
    });
  }
}
