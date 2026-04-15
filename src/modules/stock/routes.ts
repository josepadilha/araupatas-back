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
import { CreateControlledBatchController } from "./controllers/controlled-batches/createControlledBatch.controller";
import { AddControlledOutMovementController } from "./controllers/controlled-batches/addControlledOutMovement.controller";
import { ListControlledBatchesController } from "./controllers/controlled-batches/listControlledBatches.controller";
import { GetControlledReportController } from "./controllers/controlled-batches/getControlledReport.controller";

const routes = Router();

routes.get(
  "/stock-location",
  ensureAuthenticated,
  new ListStockLocationController().handle
);

// Controlled batches (antes das rotas dinâmicas genéricas)
routes.post(
  "/controlled-batches",
  ensureAuthenticated,
  new CreateControlledBatchController().handle
);

routes.post(
  "/controlled-batches/out",
  ensureAuthenticated,
  new AddControlledOutMovementController().handle
);

routes.get(
  "/controlled-batches/:locationId/report",
  ensureAuthenticated,
  new GetControlledReportController().handle
);

routes.get(
  "/controlled-batches/:locationId",
  ensureAuthenticated,
  new ListControlledBatchesController().handle
);

routes.post(
  "/stock-movements/initial-movements",
  ensureAuthenticated,
  new CreateInitialStockMovementsController().handle
);

routes.post(
  "/stock-movements",
  ensureAuthenticated,
  new CreateStockMovementsController().handle
);

routes.get(
  "/stock-movements/:locationId/:productId",
  ensureAuthenticated,
  new GetStockMovementsController().handle
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
  "",
  ensureAuthenticated,
  new CreateStockController().handle
);

// Rotas dinâmicas genéricas por último
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


export { routes as stockRoutes };