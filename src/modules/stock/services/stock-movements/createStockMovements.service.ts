import { AppDataSource } from "../../../../config/database";
import { Stock } from "../../entities/Stock";
import { StockMovement } from "../../entities/StockMovement";

interface IUnitRequest {
  productId: string;
  locationId: string;
  type: string;
  userId: string;
  quantity: number
}
export class CreateStockMovementsService {
  async execute({ productId, locationId, type, userId, quantity }: IUnitRequest) {
    
    return await AppDataSource.transaction(async (manager) => {

      const stockRepo = manager.getRepository(Stock);
      const movementRepo = manager.getRepository(StockMovement);

      let stock = await stockRepo.findOne({
        where: { product_id: productId, location_id: locationId }
      });

      if (!stock) {
        throw new Error("Produto não cadastrado nesse estoque.");
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

      console.log('NOW Date():', new Date());
      console.log('NOW ISO:', new Date().toISOString());
      console.log('NOW locale:', new Date().toLocaleString('pt-BR'));

      const movement = movementRepo.create({
        type,
        created_by: userId,
        location_id: locationId,
        product_id: productId,
        quantity,
      });

      await movementRepo.save(movement);

      return movement;
    });
  }
}
