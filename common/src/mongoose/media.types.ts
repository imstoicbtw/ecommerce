import type { HydratedDocument, Model } from "mongoose";


export interface IMediaRawDoc {
    name: string;
    alt: string;
    url: string;
    publicId: string,
    size: number;
    format: "jpg" | "png" | "jpeg" | "webp" | "mp4" | "mkv";
}


export interface IMediaMethods {
}

export interface IMediaVirtuals {
}

export type TMediaModel = Model<IMediaRawDoc, {}, IMediaMethods, IMediaVirtuals>;
export type TMedia = HydratedDocument<IMediaRawDoc, IMediaMethods & IMediaVirtuals>;
export type TMediaLean = IMediaRawDoc & IMediaVirtuals;