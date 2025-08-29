import { randomBytes } from "crypto";
import { Request } from "express";
import multer from "multer";
import path from "path";

export function multerDiskStorage(destination: string): multer.StorageEngine {
    return multer.diskStorage({
        destination,
        filename: (req: Request, file: Express.Multer.File, callback): void => {
            const randomString = randomBytes(16).toString("hex");
            const fileName = `${randomString}_${Date.now()}${path.extname(file.originalname)}`;
            callback(null, fileName);
        }
    });
}