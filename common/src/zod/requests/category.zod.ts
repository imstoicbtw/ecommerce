import { zod } from "../../exports.js";
import { zodMongooseObjectId, zodString } from "../utils.zod.js";


export const createCategoryReqBody = zod.object({
    name: zodString("Category name is not valid."),
    slug: zodString("Category slug is not valid."),
}, {message: "This must be an object."});
export type createCategoryReqBodyType = zod.infer<typeof createCategoryReqBody>;


export const updateCategoryReqBody = createCategoryReqBody.partial();
export type updateCategoryReqBodyType = zod.infer<typeof updateCategoryReqBody>;