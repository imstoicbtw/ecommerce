import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";
import { multerDiskStorage } from "../config/multer.config.js";


export const multerImage: Multer = multer({
    storage: multerDiskStorage("./temp/images"),
    fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void => {
        const allowedFileTypes: Array<string> = ["jpeg", "jpg", "png", "webp"];
        const allowedMimeTypes: Array<string> = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        const extensionName: boolean = allowedFileTypes.includes(path.extname(file.originalname).replace(".", ""));
        const mimeType: boolean = allowedMimeTypes.includes(file.mimetype);
        if (!extensionName || !mimeType) {
            return callback(new Error(`Only [${allowedFileTypes.join()}] file types are allowed.`));
        }
        return callback(null, true);
    },
});