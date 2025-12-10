import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";
import admin from "firebase-admin";

export class DeleteUserService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await admin.auth().updateUser(id, {
      disabled: true,
    });

    await repo.softRemove(user);

    return { message: "User disabled in Firebase and soft deleted locally" };
  }
}
