import { zod } from "../../exports.js";
import { zodEmail, zodLiteral, zodName, zodPassword, zodString } from "../utils.zod.js";


// * registerUser
export const registerUserReqBody = zod.object({
    name: zodName,
    email: zodEmail(),
    password: zodPassword(),
}, {message: "This must be an object."});
export type registerUserReqBodyType = zod.infer<typeof registerUserReqBody>;


// * loginUser
export const loginUserReqBody = zod.object({
    email: zodEmail(),
    password: zodString("Invalid password."),
}, {message: "This must be an object."});
export type loginUserReqBodyType = zod.infer<typeof loginUserReqBody>;