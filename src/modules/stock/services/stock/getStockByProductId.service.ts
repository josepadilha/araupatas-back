import { error } from "console";
import { AppDataSource } from "../../../../config/database";
import { Stock } from "../../entities/Stock";

export class GetStockByProductIdService {
  async execute(locationId: string, productId: string) {
    const repo = AppDataSource.getRepository(Stock);

    const stock = await repo.findOne({
      where: {
        location_id: locationId,
        product_id: productId
      },
      relations: {
        product: {
          category: true,
          unit: true
        }
      },
      order: {
        updatedAt: 'DESC'
      }
    });

    if (!stock) {
      throw new Error("Product not found.");
    }
    
    return {
      id: stock.product.id,
      name: stock.product.name,
      category: stock.product.category?.name ?? '',
      unit: stock.product.unit?.name ?? '',
      currentQuantity: stock.quantity,
      warehouseId: stock.location_id,
    };
  }
}
