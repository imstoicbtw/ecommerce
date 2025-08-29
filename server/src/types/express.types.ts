import type { TMedia } from "../../../common/dist/mongoose/media.types.js";
import type { TUser } from "../../../common/dist/mongoose/user.types.js";


declare module "express-serve-static-core" {
    interface Request {
        user: Omit<TUser, "password">;
        media: Array<TMedia>;
    }
}