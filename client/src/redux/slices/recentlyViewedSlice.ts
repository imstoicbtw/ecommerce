import type { IProductRawDoc, IProductReviewRawDoc } from "common/dist/mongoose/product.types.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type RecentlyViewedItem = Omit<IProductRawDoc, "thumbnail" | "gallery" | "reviews" | "category"> & {
    _id: string;
    thumbnail: { url: string } | null;
    category: { name: string, slug: string };
    reviews: IProductReviewRawDoc[];
};

const localRecentList = localStorage.getItem("recentlyViewed");
const initialState: RecentlyViewedItem[] = localRecentList ? JSON.parse(localRecentList) : [];

export const recentlyViewedSlice = createSlice({
    name: "recentlyViewed",
    initialState,
    reducers: {
        addRecentlyViewedItem: (recentlyViewedList, action: PayloadAction<RecentlyViewedItem>) => {
            const itemIndex = recentlyViewedList.findIndex(item => item._id === action.payload._id);
            if (itemIndex < 0) recentlyViewedList.unshift(action.payload);
            if (recentlyViewedList.length > 8) recentlyViewedList.pop();
            updateRecentlyViewedList(recentlyViewedList);
        },
    },
});

export const { addRecentlyViewedItem } = recentlyViewedSlice.actions;


function updateRecentlyViewedList (recentlyViewedList: typeof initialState) {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewedList));
}