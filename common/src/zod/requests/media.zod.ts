import { zod } from "../../exports.js";
import { zodMongooseObjectId, zodString } from "../utils.zod.js";


export const updateMediaDetailsReqBody = zod.object({
    name: zodString("Media name is invalid").optional(),
    alt: zodString("Media alt text is invalid").optional(),
}, { message: "This must be an object." });
export type updateMediaDetailsReqBodyType = zod.infer<typeof updateMediaDetailsReqBody>;