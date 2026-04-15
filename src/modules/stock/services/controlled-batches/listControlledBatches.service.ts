import { AppDataSource } from "../../../../config/database";
import { ControlledBatch } from "../../entities/ControlledBatch";

interface ListControlledBatchesDTO {
  locationId: string;
  productId?: string;
}

export class ListControlledBatchesService {
  async execute({ locationId, productId }: ListControlledBatchesDTO) {
    const batchRepo = AppDataSource.getRepository(ControlledBatch);

    const query = batchRepo
      .createQueryBuilder("batch")
      .leftJoinAndSelect("batch.product", "product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.unit", "unit")
      .leftJoinAndSelect("batch.location", "location")
      .where("batch.location_id = :locationId", { locationId });

    if (productId) {
      query.andWhere("batch.product_id = :productId", { productId });
    }

    query.andWhere("batch.current_quantity > 0");
    query.orderBy("batch.expiration_date", "ASC");

    const batches = await query.getMany();

    return batches.map((b) => ({
      id: b.id,
      batchNumber: b.batch_number,
      expirationDate: b.expiration_date,
      initialQuantity: b.initial_quantity,
      currentQuantity: b.current_quantity,
      nfNumber: b.nf_number ?? null,
      createdAt: b.createdAt,
      product: {
        id: b.product.id,
        name: b.product.name,
        unit: b.product.unit?.name ?? null,
      },
      location: {
        id: b.location.id,
        name: b.location.name,
      },
    }));
  }
}
