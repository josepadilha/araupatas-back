import { AppDataSource } from "../../../../config/database";
import { Product } from "../../../products/entities/Product";
import { ControlledBatch } from "../../entities/ControlledBatch";
import { StockMovement } from "../../entities/StockMovement";

interface RegularEntry {
  type: "regular";
  productId: string;
  locationId: string;
  quantity: number;
}

interface ControlledEntry {
  type: "controlled";
  productId: string;
  locationId: string;
  batchNumber: string;
  expirationDate: string;
  quantity: number;
}

export type NfeEntry = RegularEntry | ControlledEntry;

interface ImportNfeDTO {
  entries: NfeEntry[];
  observation: string;
  userId: string;
}

export class ImportNfeService {
  async execute({ entries, observation, userId }: ImportNfeDTO) {
    return await AppDataSource.transaction(async (manager) => {
      for (const entry of entries) {
        if (entry.type === "regular") {
          const product = await manager
            .getRepository(Product)
            .findOne({ where: { id: entry.productId } });

          if (!product) {
            throw new Error(`Produto não encontrado (id: ${entry.productId}).`);
          }

          if (product.is_controlled) {
            throw new Error(
              `Produto "${product.name}" é controlado e requer número de lote e validade.`
            );
          }

          await manager.query(
            `INSERT INTO stock (product_id, location_id, quantity)
             VALUES ($1, $2, $3)
             ON CONFLICT (product_id, location_id)
             DO UPDATE SET quantity = stock.quantity + EXCLUDED.quantity, "updatedAt" = NOW()`,
            [entry.productId, entry.locationId, entry.quantity]
          );

          const movement = manager.create(StockMovement, {
            type: "IN",
            created_by: userId,
            location_id: entry.locationId,
            product_id: entry.productId,
            quantity: entry.quantity,
            observation: observation || null,
          });
          await manager.save(StockMovement, movement);
        } else {
          const product = await manager
            .getRepository(Product)
            .findOne({ where: { id: entry.productId } });

          if (!product) throw new Error("Produto não encontrado.");
          if (!product.is_controlled)
            throw new Error(`Produto "${product.name}" não é controlado.`);

          const batch = manager.create(ControlledBatch, {
            product_id: entry.productId,
            location_id: entry.locationId,
            batch_number: entry.batchNumber,
            expiration_date: entry.expirationDate,
            initial_quantity: entry.quantity,
            current_quantity: entry.quantity,
            nf_number: observation.replace(/^NF /, "") || undefined,
          });
          await manager.save(ControlledBatch, batch);

          await manager.query(
            `INSERT INTO stock (product_id, location_id, quantity)
             VALUES ($1, $2, $3)
             ON CONFLICT (product_id, location_id)
             DO UPDATE SET quantity = stock.quantity + EXCLUDED.quantity, "updatedAt" = NOW()`,
            [entry.productId, entry.locationId, entry.quantity]
          );

          const movement = manager.create(StockMovement, {
            product_id: entry.productId,
            location_id: entry.locationId,
            type: "IN",
            quantity: entry.quantity,
            created_by: userId,
            batch_id: batch.id,
            observation: `Lote: ${entry.batchNumber} | Validade: ${entry.expirationDate} | ${observation}`,
          });
          await manager.save(StockMovement, movement);
        }
      }
    });
  }
}
