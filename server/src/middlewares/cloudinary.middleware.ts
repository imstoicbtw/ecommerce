import { UploadApiResponse } from "cloudinary";
import type { TMedia } from "common/dist/mongoose/media.types.js";
import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary.util.js";
import { MediaModel } from "../models/media.model.js";
import { unlinkSync } from "fs";


export async function cloudinarySingleUpload (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { file } = req;
    if (!file) {
        res.status(400);
        throw new Error("Missing media file.");
    }
    try {
        const upload: UploadApiResponse = await uploadToCloudinary(file.path);
        const media: TMedia = new MediaModel({
            name: file.originalname,
            alt: file.originalname,
            url: upload.url,
            format: upload.format,
            size: upload.bytes,
            publicId: upload.public_id,
        });
        ;
        req.media = [ media ];
        next();
    } finally {
        try {
            unlinkSync(file.path);
        } catch (unlinkError) {
            console.error(unlinkError);
            // TODO: Implement cleanup queue later.
        }
    }
}