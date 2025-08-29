import bcrypt from "bcryptjs";
import { Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { jwtPayload } from "../types/jwt.types.js";


const accessTokenLife = 15 * 60 * 1000;
const refreshTokenLife = 7 * 24 * 60 * 60 * 1000;
const isProductionEnv: boolean = process.env.NODE_ENV === "production";


export async function hashString(string: string): Promise<string> {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(string, salt);
}

export async function compareHash(string: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(string, hash);
}


export function signAccessToken(payload: jwtPayload, expiry: number = (accessTokenLife)): string {
    return Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: expiry,
    });
};

export function verifyAccessToken(token: string) {
    return Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload & Jwt.JwtPayload;
}

export function signRefreshToken(payload: jwtPayload, expiry: number = (7 * 24 * 60 * 60 * 1000)): string {
    return Jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: expiry,
    });
};

export function verifyRefreshToken(token: string) {
    return Jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload & Jwt.JwtPayload;
}


export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: accessTokenLife,
        sameSite: "strict",
        secure: isProductionEnv,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: refreshTokenLife,
        sameSite: "strict",
        secure: isProductionEnv
    });
}

export function clearAuthCookies(res: Response): void {
    res.clearCookie("accessToken", { sameSite: "strict", secure: isProductionEnv });
    res.clearCookie("refreshToken", { sameSite: "strict", secure: isProductionEnv });
}