import { Router } from "express";
import { ensureAuthenticated } from "../../shared/middlewares/ensureAuthenticated";
import { CreateProductsCategoriesController } from "./controllers/products-category/createProductsCategories.controller";
import { ListCategoriesController } from "./controllers/products-category/listProductsCategories.controller";
import { DeleteCategoriesController } from "./controllers/products-category/deleteProductsCategories.controller";
import { EditCategoriesController } from "./controllers/products-category/editProductsCategories.controller";
import { EditUnitsController } from "./controllers/products-units/editProductsUnits.controller";
import { DeleteUnitsController } from "./controllers/products-units/deleteProductsUnits.controller";
import { ListUnitsController } from "./controllers/products-units/listProductsUnits.controller";
import { CreateProductsUnitsController } from "./controllers/products-units/createProductsUnits.controller";

const routes = Router();

routes.post(
  "/products-categories",
  ensureAuthenticated,
  new CreateProductsCategoriesController().handle
);

routes.get(
  "/products-categories",
  ensureAuthenticated,
  new ListCategoriesController().handle
);

routes.delete(
  "/products-categories/:id",
  ensureAuthenticated,
  new DeleteCategoriesController().handle
);

routes.put(
  "/products-categories/:id",
  ensureAuthenticated,
  new EditCategoriesController().handle
);

routes.post(
  "/products-units",
  ensureAuthenticated,
  new CreateProductsUnitsController().handle
);

routes.get(
  "/products-units",
  ensureAuthenticated,
  new ListUnitsController().handle
);

routes.delete(
 "/products-units/:id",
  ensureAuthenticated,
  new DeleteUnitsController().handle
);

routes.put(
  "/products-units/:id",
  ensureAuthenticated,
  new EditUnitsController().handle
);


export { routes as productsRoutes };