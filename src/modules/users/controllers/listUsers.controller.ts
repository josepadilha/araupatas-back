import { Request, Response } from "express";
import { ListUsersService } from "../services/listusers.service";

export class ListUsersController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListUsersService();
      const users = await service.execute();

      return res.status(200).json(users);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
