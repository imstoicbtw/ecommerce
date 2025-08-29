import type { TUser } from "common/dist/mongoose/user.types.js";
import { NextFunction, Request, Response } from "express";
import { loginUserReqBodyType } from "../../../common/dist/zod/requests/auth.zod.js";
import { UserModel } from "../models/user.model.js";
import { clearAuthCookies, hashString, setAuthCookies, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/auth.util.js";


// TODO: Implement hybrid authentication for login, logout, and registration.


/**
 * Register a new customer.
 * @access OPEN
 * POST /auth/register/
 */
export async function registerUser (req: Request, res: Response): Promise<void> {
    const { body } = req;
    const existingUser: TUser | null = await UserModel.findOne({ email: body.email });
    if (existingUser) {
        res.status(409);
        throw new Error("User with this email already exists!");
    }
    const user: TUser = await UserModel.create({ ...body, role: "customer" });
    if (!user) {
        res.status(500);
        throw new Error("Internal server error!");
    }
    const accessToken = signAccessToken({ _id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ _id: user._id, role: user.role });
    user.refreshToken = await hashString(refreshToken);
    const savedUser = await user.save();
    setAuthCookies(res, accessToken, refreshToken);
    res.status(201).json({
        success: true,
        message: "Registration successful!",
        user: { ...user.toObject(), password: null, refreshToken: null },
    });
}


/**
 * Login existing user.
 * @access OPEN
 * POST /auth/login/
 */
export async function loginUser (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as loginUserReqBodyType;
    const user: TUser | null = await UserModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("No user found with this email address!");
    }
    if (!(await user.comparePassword(password))) {
        res.status(401);
        throw new Error("Invalid password!");
    }
    const accessToken = signAccessToken({ _id: user._id, role: user.role });
    const refreshToken = signRefreshToken({ _id: user._id, role: user.role });
    user.refreshToken = await hashString(refreshToken);
    await user.save();
    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({
        success: true,
        message: "Login successful!",
        user: { ...user.toObject(), password: null, refreshToken: null },
    });
}


/**
 * Logout user.
 * @access Any authenticated user.
 * POST /api/auth/logout/
 */
export async function logoutUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const refresh: string | undefined = req.cookies.refreshToken;
        if (!refresh) {
            res.status(401);
            return next(new Error("You are already logged out!"));
        }
        try {
            const payload = verifyRefreshToken(refresh);
            const user = await UserModel.findById(payload._id);
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        } catch (error) {
        }
    } catch (error) {
    }
    clearAuthCookies(res);
    res.json({
        success: true,
        message: "Logged out successfully!",
    });
}