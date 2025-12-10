import { Router } from "express";
import { CreateUserController } from "./controllers/createUser.controller";
import { ensureAuthenticated } from "../../shared/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../shared/middlewares/ensureAdmin";
import { ListUsersController } from "./controllers/listUsers.controller";
import { DeleteUsersController } from "./controllers/deleteUsers.controller";

const routes = Router();

routes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateUserController().handle
);

routes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new ListUsersController().handle
);

routes.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  new DeleteUsersController().handle
);


export { routes as usersRoutes };