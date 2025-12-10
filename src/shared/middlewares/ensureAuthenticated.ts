import { Request, Response, NextFunction } from "express";
import admin from "../../config/firebase/firebaseAdmin";

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = {
      id: decoded.uid,
      email: decoded.email || ""
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

