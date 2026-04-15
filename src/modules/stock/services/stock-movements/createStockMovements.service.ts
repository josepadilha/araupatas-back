import { AppDataSource } from "../../../../config/database";
import { Product } from "../../../products/entities/Product";
import { Stock } from "../../entities/Stock";
import { StockMovement } from "../../entities/StockMovement";

interface IUnitRequest {
  productId: string;
  locationId: string;
  type: string;
  userId: string;
  quantity: number;
  observation?: string;
}
export class CreateStockMovementsService {
  async execute({ productId, locationId, type, userId, quantity, observation }: IUnitRequest) {

    return await AppDataSource.transaction(async (manager) => {

      const stockRepo = manager.getRepository(Stock);
      const movementRepo = manager.getRepository(StockMovement);

      const product = await manager.getRepository(Product).findOne({ where: { id: productId } });
      if (product?.is_controlled) {
        throw new Error("Produto controlado não pode ter movimentação normal. Use o fluxo de controlados.");
      }

      let stock = await stockRepo.findOne({
        where: { product_id: productId, location_id: locationId }
      });

      if (!stock) {
        if (type === "OUT") {
          throw new Error("Produto não cadastrado nesse estoque.");
        }
        stock = await stockRepo.create({
          location_id: locationId,
          product_id: productId,
          quantity: 0
        });
      }

      if (type === "IN") {
        stock.quantity += quantity;
      }

      if (type === "OUT") {
        if (stock.quantity < quantity) {
          throw new Error("Estoque insuficiente");
        }
        stock.quantity -= quantity;
      }

      await stockRepo.save(stock);

      const movement = movementRepo.create({
        type,
        created_by: userId,
        location_id: locationId,
        product_id: productId,
        quantity,
        observation: observation || null,
      });

      await movementRepo.save(movement);

      return movement;
    });
  }
}
