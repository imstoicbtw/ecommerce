import { v2 as cloudinary, UploadApiResponse } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export async function uploadToCloudinary (filePath: string): Promise<UploadApiResponse> {
    return await cloudinary.uploader.upload(filePath);
}

export async function destroyFromCloudinary (publicId: string): Promise<boolean> {
    const { result } = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    if (result) return true;
    return false;
}