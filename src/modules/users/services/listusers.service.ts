import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";

export class ListUsersService {
  async execute() {
    const repo = AppDataSource.getRepository(User);

    const users = await repo.find();

    return users;
  }
}
