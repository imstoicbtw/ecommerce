import { Router } from "express";
import { userRoles } from "../../../common/dist/constants.js";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryProducts,
    updateCategory,
} from "../controllers/category.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";
import { createCategoryReqBody, updateCategoryReqBody } from "../../../common/dist/zod/requests/category.zod.js";


export const categoryRouter = Router();


categoryRouter.route("/")
              .get(getAllCategories)
              .post(
                  authenticate,
                  authorize(userRoles.Admin, userRoles.Manager),
                  validateBody(createCategoryReqBody),
                  createCategory,
              );

categoryRouter.route("/:categoryId")
              .get(getCategoryById)
              .patch(
                  authenticate,
                  authorize(userRoles.Admin, userRoles.Manager),
                  validateBody(updateCategoryReqBody),
                  updateCategory,
              )
              .delete(
                  authenticate,
                  authorize(userRoles.Admin, userRoles.Manager),
                  deleteCategory,
              );

categoryRouter.route("/:categoryId/products/")
              .get(getCategoryProducts);