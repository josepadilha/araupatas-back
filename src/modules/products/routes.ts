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
import { CreateProductsController } from "./controllers/products/createProducts.controller";
import { ListProductSelectController } from "./controllers/products/listProducts.controller";
import { EditProductsController } from "./controllers/products/editProducts.controller";
import { DeleteProductsController } from "./controllers/products/deleteProducts.controller";
import { ListProductsController } from "./controllers/products/listProductsSelect.controller";

const routes = Router();

routes.post(
  "/",
  ensureAuthenticated,
  new CreateProductsController().handle
);

routes.get(
  "/",
  ensureAuthenticated,
  new ListProductsController().handle
);

routes.put(
  "/:id",
  ensureAuthenticated,
  new EditProductsController().handle
);

routes.delete(
  "/:id",
  ensureAuthenticated,
  new DeleteProductsController().handle
);

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

routes.get('/select', new ListProductSelectController().handle);


export { routes as productsRoutes };