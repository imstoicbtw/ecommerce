import { Router } from "express";
import { loginUserReqBody, registerUserReqBody } from "../../../common/dist/zod/requests/auth.zod.js";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate-body.middleware.js";


export const authRouter: Router = Router();

authRouter.route("/register")
    .post(
        validateBody(registerUserReqBody),
        registerUser,
    );

authRouter.route("/login")
    .post(
        validateBody(loginUserReqBody),
        loginUser,
    );

authRouter.route("/logout")
    .post(
        logoutUser
    );