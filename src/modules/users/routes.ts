import { Router } from "express";
import { CreateUserController } from "./controllers/createUser.controller";
import { ensureAuthenticated } from "../../shared/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../../shared/middlewares/ensureAdmin";
import { ListUsersController } from "./controllers/listUsers.controller";
import { ActiveUsersController, DesactiveUsersController } from "./controllers/deleteUsers.controller";
import { GetUserController } from "./controllers/getUser.controller";

const routes = Router();

routes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new CreateUserController().handle
);

routes.get(
  "/:id",
  new GetUserController().handle
);

routes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  new ListUsersController().handle
);

routes.put(
  "/desactive/:id",
  ensureAuthenticated,
  ensureAdmin,
  new DesactiveUsersController().handle
);

routes.put(
  "/active/:id",
  ensureAuthenticated,
  ensureAdmin,
  new ActiveUsersController().handle
)


export { routes as usersRoutes };