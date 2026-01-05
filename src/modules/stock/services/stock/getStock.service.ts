import { AppDataSource } from "../../../../config/database";
import { Stock } from "../../entities/Stock";
import { StockMovement } from "../../entities/StockMovement";

export class GetStockService {
  async execute(locationId: string) {

    const qb = AppDataSource
      .getRepository(Stock)
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.unit', 'unit')

      .addSelect(
        subQuery =>
          subQuery
            .select('MAX(movement.createdAt)')
            .from(StockMovement, 'movement')
            .where('movement.product_id = stock.product_id')
            .andWhere('movement.location_id = stock.location_id')
            .andWhere('movement.type = :inType'),
        'lastEntry'
      )

      .addSelect(
        subQuery =>
          subQuery
            .select('MAX(movement.createdAt)')
            .from(StockMovement, 'movement')
            .where('movement.product_id = stock.product_id')
            .andWhere('movement.location_id = stock.location_id')
            .andWhere('movement.type = :outType'),
        'lastExit'
      )

      .where('stock.location_id = :locationId', { locationId })
      .setParameters({
        inType: 'IN',
        outType: 'OUT',
      })
      .orderBy('stock.updatedAt', 'DESC');

    const { entities, raw } = await qb.getRawAndEntities();


    return entities.map((stock, index) => ({
      id: stock.product.id,
      name: stock.product.name,
      category: stock.product.category?.name ?? '',
      unit: stock.product.unit?.name ?? '',
      currentQuantity: stock.quantity,
      warehouseId: stock.location_id,
      lastEntry: raw[index]?.lastEntry ?? null,
      lastExit: raw[index]?.lastExit ?? null,
    }));
  }
}

