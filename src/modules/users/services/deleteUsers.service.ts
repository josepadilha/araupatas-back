import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";
import admin from "firebase-admin";

export class DesactiveUserService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await admin.auth().updateUser(id, {
      disabled: true,
    });

    user.isActive = false;

    await repo.save(user);

    return { message: "User disabled in Firebase and soft deleted locally" };
  }
}
export class ActiveUserService {
  async execute(id: string) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await admin.auth().updateUser(id, {
      disabled: false,
    });

    user.isActive = true;

    await repo.save(user);

    return { message: "User activated" };
  }
}
