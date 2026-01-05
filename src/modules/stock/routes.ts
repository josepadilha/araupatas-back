import { Router } from "express";
import { ensureAuthenticated } from "../../shared/middlewares/ensureAuthenticated";
import { CreateStockLocationController } from "./controllers/stock-locations/createStockLocations.controller";
import { ListStockLocationController } from "./controllers/stock-locations/listStockLocations.controller";
import { EditStockLocationController } from "./controllers/stock-locations/EditStockLocations.controller";
import { ListStockController } from "./controllers/stock/getStockById.controller";
import { CreateStockController } from "./controllers/stock/createStock.controller";
import { CreateInitialStockMovementsController } from "./controllers/stock-movements/createInitialStockMovements.controller";
import { CreateStockMovementsController } from "./controllers/stock-movements/createStockMovements.controller";
import { GetStockMovementsController } from "./controllers/stock-movements/getStockMovements.controller";
import { GetStockByProductController } from "./controllers/stock/getStockByProduct.controller";

const routes = Router();

routes.get(
  "/stock-location",
  ensureAuthenticated,
  new ListStockLocationController().handle
);

routes.get(
  "/:locationId",
  ensureAuthenticated,
  new ListStockController().handle
);

routes.get(
  "/:productId/:locationId",
  ensureAuthenticated,
  new GetStockByProductController().handle
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

routes.put(
  "/stock-location/:id",
  ensureAuthenticated,
  new EditStockLocationController().handle
);

routes.post(
  "/stock-movements",
  ensureAuthenticated,
  new CreateStockMovementsController().handle
);

routes.post(
  "/stock-movements/initial-movements",
  ensureAuthenticated,
  new CreateInitialStockMovementsController().handle
);

routes.get(
  "/stock-movements/:locationId/:productId",
  ensureAuthenticated,
  new GetStockMovementsController().handle
);


export { routes as stockRoutes };