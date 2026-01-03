import { AppDataSource } from "../../../../config/database";
import { Stock } from "../../entities/Stock";
import { StockMovement } from "../../entities/StockMovement";

interface IUnitRequest {
  productId: string;
  locationId: string;
  userId: string;
  quantity: number
}
export class CreateInitialStockMovementsService {
  async execute({ productId, locationId, userId, quantity }: IUnitRequest) {
    
    return await AppDataSource.transaction(async (manager) => {

      const stockRepo = manager.getRepository(Stock);
      const movementRepo = manager.getRepository(StockMovement);

      let stock = await stockRepo.findOne({
        where: { product_id: productId, location_id: locationId }
      });

      if (stock) {
        throw new Error("Produto já está  cadastrado nesse estoque.");
      }

      const newStock = stockRepo.create({
        location_id: locationId,
        product_id: productId,
        quantity
      })

      stockRepo.save(newStock)

      const movement = movementRepo.create({
        type: 'IN',
        created_by: userId,
        location_id: locationId,
        product_id: productId,
        quantity
      });

      await movementRepo.save(movement);

      return movement;
    });
  }
}
