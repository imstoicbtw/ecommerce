import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { userRoles } from "../../../common/dist/constants.js";
import { deleteMedia, getGallery, getMedia, getMediaById, updateMediaDetails, uploadMedia } from "../controllers/media.controller.js";
import { multerImage } from "../middlewares/multer.middleware.js";
import { cloudinarySingleUpload } from "../middlewares/cloudinary.middleware.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";


export const mediaRouter = Router();

mediaRouter.route("/")
           .get(
               authenticate,
               authorize(userRoles.Admin, userRoles.Manager),
               getMedia,
           ).post(
    authenticate,
    authorize(userRoles.Admin, userRoles.Manager),
    multerImage.single("image"),
    cloudinarySingleUpload,
    uploadMedia,
);

mediaRouter.route("/gallery").get(getGallery);

mediaRouter.route("/:mediaId")
           .get(
               getMediaById,
           ).delete(
    authenticate,
    authorize(userRoles.Admin, userRoles.Manager),
    deleteMedia,
).patch(
    authenticate,
    authorize(userRoles.Admin, userRoles.Manager),
    // TODO: Create middleware for optional media upload.
    // multerImage.single("image"),
    // cloudinarySingleUpload,
    updateMediaDetails,
);