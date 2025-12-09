import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../modules/users/infra/typeorm/entities/User";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const repo = AppDataSource.getRepository(User);

  const user = await repo.findOne({ where: { id: req.user.id } });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Only admin allowed" });
  }

  return next();
}
