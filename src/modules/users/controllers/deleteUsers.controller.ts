import { Request, Response } from "express";
import { DeleteUserService } from "../services/deleteUsers.service";

export class DeleteUsersController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params; 

      const service = new DeleteUserService();
      const result = await service.execute(id);

      return res.status(200).json(result);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
