import { AppDataSource } from "../../../../config/database";
import { User } from "../../../users/entities/User";
import { StockMovement } from "../../entities/StockMovement";

interface IUnitRequest {
  productId: string;
  locationId: string;
}
export class GetStockMovementsService {
  async execute({ productId, locationId }: IUnitRequest) {
    
      const movementRepo = AppDataSource.getRepository(StockMovement);

      const movements = await movementRepo.find({
        where: {
          location_id: locationId,
          product_id: productId,
        },
        relations: ['user']
      });

      return movements.map(m => ({
        id: m.id,
		    productId: m.product_id,
		    createdBy: m.user.name,
		    quantity: m.quantity,
		    type: m.type,
		    date: m.createdAt,
        observation: ''
      }))
  }
}