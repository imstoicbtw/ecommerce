import { model, Schema } from "mongoose";
import { IMediaRawDoc } from "../../../common/dist/mongoose.types.js";
import type { IMediaMethods, IMediaVirtuals, TMediaModel } from "../../../common/dist/mongoose/media.types.js";


export const mediaSchema: Schema = new Schema<IMediaRawDoc, TMediaModel, IMediaMethods, {}, IMediaVirtuals>({
    name: {
        type: String,
        required: [ true, "Media name is required." ],
    },
    alt: {
        type: String,
        required: [ true, "Media alt text is required for SEO and accessibility." ],
    },
    url: {
        type: String,
        required: [ true, "Media url is required." ],
    },
    publicId: {
        type: String,
        required: [ true, "Cloudinary public id is required." ],
    },
    size: {
        type: Number,
        required: [ true, "Media size is required." ],
    },
    format: {
        type: String,
        required: [ true, "Media format is required." ],
        enum: {
            values: [ "jpg", "png", "jpeg", "webp", "mp4", "mkv" ],
            message: "{VALUE} is not a valid media format.",
        },
    },
}, { timestamps: true });

mediaSchema.pre("find", function (next) {
    this.sort("-createdAt");
    next();
});


export const MediaModel: TMediaModel = model<IMediaRawDoc, TMediaModel, IMediaMethods>("Media", mediaSchema);