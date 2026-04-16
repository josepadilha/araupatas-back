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

      if (type === "IN") {
        await manager.query(`
          INSERT INTO stock (product_id, location_id, quantity)
          VALUES ($1, $2, $3)
          ON CONFLICT (product_id, location_id)
          DO UPDATE SET quantity = stock.quantity + EXCLUDED.quantity, "updatedAt" = NOW()
        `, [productId, locationId, quantity]);
      }

      if (type === "OUT") {
        const stock = await stockRepo.findOne({
          where: { product_id: productId, location_id: locationId }
        });
        if (!stock) throw new Error("Produto não cadastrado nesse estoque.");
        if (stock.quantity < quantity) throw new Error("Estoque insuficiente");
        stock.quantity -= quantity;
        await stockRepo.save(stock);
      }

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
