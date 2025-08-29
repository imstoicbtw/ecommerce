import type { TUser } from "common/dist/mongoose/user.types.js";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import { clearAuthCookies, compareHash, hashString, setAuthCookies, signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/auth.util.js";


export async function authenticate (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { accessToken } = req.cookies;
    try {
        const { _id } = verifyAccessToken(accessToken);
        const user: Omit<TUser, "password" & "refreshToken"> | null = await UserModel.findById(_id, [ "-password", "-refreshToken" ]);
        if (!user) {
            try {
                throw new Error("User not found!");
            } catch (error) {
                res.status(404);
                return next(error);
            }
        }
        req.user = user;
        return next();
    } catch (error) {
    }
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) throw new Error("You are not logged in, please login.");
        const { _id } = verifyRefreshToken(refreshToken);
        const user = await UserModel.findById(_id);
        if (!user) throw new Error("User not found.");
        if (!user.refreshToken) throw new Error("You are not logged in, please login again...");
        if (!(await compareHash(refreshToken, user.refreshToken))) {
            user.refreshToken = null;
            await user.save();
            throw new Error("You are not logged in, please login again...");
        }
        const newAccessToken = signAccessToken({ _id: user._id, role: user.role });
        const newRefreshToken = signRefreshToken({ _id: user._id, role: user.role });
        user.refreshToken = await hashString(newRefreshToken);
        const savedUser = await user.save();
        setAuthCookies(res, newAccessToken, newRefreshToken);
        req.user = savedUser;
        return next();
    } catch (error) {
        clearAuthCookies(res);
        res.status(401);
        return next(new Error("You are not logged in, please login again..."));
    }
}


export function authorize (...allowedRoles: Array<string>) {
    return function (req: Request, res: Response, next: NextFunction): void {
        if (!req.user) {
            res.status(401);
            throw new Error("You are currently not logged in!");
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403);
            throw new Error("You are not allowed to access this resource!");
        }
        next();
    };
}