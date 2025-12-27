import { Request, Response } from "express";
import { DesactiveUserService, ActiveUserService } from "../services/deleteUsers.service";

export class DesactiveUsersController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params; 

      const service = new DesactiveUserService();
      const result = await service.execute(id);

      return res.status(200).json(result);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}


export class ActiveUsersController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params; 

      const service = new ActiveUserService();
      const result = await service.execute(id);

      return res.status(200).json(result);

    } catch (err: any) {
      return res.status(400).json({ error: err.message || err });
    }
  }
}
