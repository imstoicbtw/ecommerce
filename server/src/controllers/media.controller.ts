import { UploadApiResponse } from "cloudinary";
import type { TMedia, TMediaLean } from "common/dist/mongoose/media.types.js";
import { type NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { DeleteResult } from "mongoose";
import { MediaModel } from "../models/media.model.js";
import { destroyFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.util.js";


/**
 * Get all media items.
 * @access [admin, manager]
 * GET /api/media/
 */
export async function getMedia (req: Request, res: Response): Promise<void> {
    const media: Array<TMedia> = await MediaModel.find();
    res.json({
        success: true,
        message: `${media.length} media item(s) found.`,
        data: media,
    });
}

/**
 * Get a gallery by an array.
 * @access OPEN
 * GET /api/media/gallery/
 */
export async function getGallery (req: Request, res: Response): Promise<void> {
    const { gallery: galleryIds } = req.query;
    if (!galleryIds) {
        res.status(400);
        throw new Error("Gallery id(s) are required. and should be joined by comma.");
    }
    const gallery = await MediaModel.find({ _id: { $in: galleryIds.toString().split(",") } });
    res.json({
        success: true,
        message: `${gallery.length} media item(s) found.`,
        data: gallery,
    });
}


/**
 * Upload a media item.
 * @access [admin, manager]
 * POST /api/media/
 */
// TODO: Add mutation in client.
export async function uploadMedia (req: Request, res: Response): Promise<void> {
    const { media } = req;
    const result: Array<TMediaLean> = await Promise.all(
        media.map(async (item): Promise<TMediaLean> => await item.save()),
    );
    console.log(result);
    res.json({
        success: true,
        message: "Media uploaded successfully.",
        data: result,
    });
}


/**
 * Get single media item.
 * @access OPEN
 * GET /api/media/:mediaId/
 */
export async function getMediaById (req: Request, res: Response): Promise<void> {
    const { mediaId } = req.params;
    const media: TMedia | null = await MediaModel.findById(mediaId);
    if (!media) {
        res.status(404);
        throw new Error("Media not found.");
    }
    res.json({
        success: true,
        data: media,
    });
}


/**
 * Delete single media item.
 * @access [admin, manager]
 * DELETE /api/media/:mediaId/
 */
export async function deleteMedia (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { mediaId } = req.params;
    const media: TMedia | null = await MediaModel.findById(mediaId);
    if (!media) {
        res.status(404);
        throw new Error("Media not found.");
    }
    try {
        if (!(await destroyFromCloudinary(media.publicId))) throw new Error("Unable to delete media from cloudinary.");
    } catch (error: any) {
        console.error(error);
        return next(new Error(error.message));
    }
    const mediaResult: DeleteResult = await media.deleteOne();
    if (!mediaResult.deletedCount) {
        res.status(404);
        throw new Error("Media you were trying to delete was not found.");
    }
    res.json({
        success: true,
        message: "Media deleted successfully.",
    });
}


/**
 * Update Media
 * @access [admin, manager]
 * PATCH /api/media/:mediaId/
 */
// TODO: Add mutation in client.
export async function updateMediaDetails (req: Request, res: Response): Promise<void> {
    const { params, file } = req;
    const { mediaId } = params;
    const media: TMedia | null = await MediaModel.findById(mediaId);
    if (!media) {
        res.status(404);
        throw new Error("Media not found.");
    }
    if (file) {
        const { url, bytes, format }: UploadApiResponse = await uploadToCloudinary(file.path);
        media.set({ url, format, size: bytes });
        try {
            await destroyFromCloudinary(media.publicId);
        } catch (error) {
            console.error(error);
        }
    }
    media.set(req.body);
    const result = await media.save();
    res.json({
        success: true,
        message: "Media updated successfully.",
        data: result,
    });
}