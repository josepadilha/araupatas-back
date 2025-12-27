import { Request, Response } from "express";
import { GetUserService } from "../services/getUser.service";

export class GetUserController {
  async handle(req: Request, res: Response) {
    try {
      console.log('req.params.id', req.params.id)
      const userId = req.params.id
      const service = new GetUserService();
      const users = await service.execute(userId);

      return res.status(200).json(users);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
