import { MEDIA_URL } from "../../../../common/dist/index.js";
import { apiSlice } from "./baseQuery.ts";

// TODO: add upload and update media mutations.

export const mediaApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMedia: builder.query({
            query: () => ({
                url: MEDIA_URL,
            }),
        }),
        getGallery: builder.query({
            query: (gallery: string[]) => ({
                url: `${MEDIA_URL}/gallery?gallery=${gallery.join()}`,
            }),
        }),
        getMediaById: builder.query({
            query: (mediaId: string) => ({
                url: `${MEDIA_URL}/${mediaId}`,
            }),
        }),
        deleteMedia: builder.mutation({
            query: (mediaId: string) => ({
                url: `${MEDIA_URL}/${mediaId}`,
                method: "DELETE",
            }),
        }),
        uploadMedia: builder.mutation({
            query: (formData: FormData) => ({
                url: MEDIA_URL,
                method: "POST",
                body: formData,
                formData: true,
            }),
        }),
    }),
});


export const { useGetMediaQuery, useGetMediaByIdQuery, useDeleteMediaMutation, useUploadMediaMutation, useGetGalleryQuery } = mediaApiSlice;