import { Router } from "express";
import { ensureAuthenticated } from "../../shared/middlewares/ensureAuthenticated";
import { CreateStockLocationController } from "./controllers/stock-locations/createStockLocations.controller";
import { ListStockLocationController } from "./controllers/stock-locations/listStockLocations.controller";
import { EditStockLocationController } from "./controllers/stock-locations/EditStockLocations.controller";
import { ListStockController } from "./controllers/stock/getStockById.controller";
import { CreateStockController } from "./controllers/stock/createStock.controller";



const routes = Router();

routes.get(
  "/:id",
  ensureAuthenticated,
  new ListStockController().handle
);

routes.post(
  "",
  ensureAuthenticated,
  new CreateStockController().handle
);

routes.post(
  "/stock-location",
  ensureAuthenticated,
  new CreateStockLocationController().handle
);

routes.get(
  "/stock-location",
  ensureAuthenticated,
  new ListStockLocationController().handle
);

routes.put(
  "/stock-location/:id",
  ensureAuthenticated,
  new EditStockLocationController().handle
);

export { routes as stockRoutes };