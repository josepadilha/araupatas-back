import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";

export class GetUserService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({
      where: {
        id,
      },
      withDeleted: true,
      
    });

    return user;
  }
}
