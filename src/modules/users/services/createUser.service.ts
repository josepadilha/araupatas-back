import admin from "firebase-admin";
import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class CreateUserService {
  async execute({ name, email, password, role }: IRequest) {

    const firebaseUser = await admin.auth().createUser({
      email,
      password,
    });

    const repo = AppDataSource.getRepository(User);

    const newUser = repo.create({
      id: firebaseUser.uid,
      name,
      email,
      role,
    });

    await repo.save(newUser);

    return newUser;
  }
}
