import { zod } from "../../exports.js";
import { zodString } from "../utils.zod.js";
export const updateMediaReqBody = zod.object({
    name: zodString().optional(),
    alt: zodString().optional(),
});
//# sourceMappingURL=media.zod.js.map