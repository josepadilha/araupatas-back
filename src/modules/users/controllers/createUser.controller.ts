import { Request, Response } from "express";
import admin from "firebase-admin";
import { AppDataSource } from "../../../config/database";
import { User } from "../infra/typeorm/entities/User";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      const firebaseUser = await admin.auth().createUser({
        email,
        password
      });

      const repo = AppDataSource.getRepository(User);

      const newUser = repo.create({
        id: firebaseUser.uid,
        name,
        email,
        role
      });

      await repo.save(newUser);

      return res.status(201).json(newUser);

    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
