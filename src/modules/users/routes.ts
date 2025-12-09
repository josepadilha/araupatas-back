import { Router } from "express";
import { CreateUserController } from "./controllers/createUser.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../middlewares/ensureAdmin";

const routes = Router();

routes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateUserController().handle
);

export { routes as usersRoutes };