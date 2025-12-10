import { Request, Response } from "express";
import { CreateUserService } from "../services/createUser.service";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    try {
      const service = new CreateUserService();

      const newUser = await service.execute({
        name,
        email,
        password,
        role,
      });

      return res.status(201).json(newUser);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
