import type { TProduct, TProductLean, TProductReview } from "common/dist/mongoose/product.types.js";
import { Request, Response } from "express";
import { type UserRole, userRoles } from "../../../common/dist/constants.js";
import { ProductModel } from "../models/product.model.js";
import { ProductReviewModel } from "../models/subdocs/product-review.model.js";


/**
 * Create a new product.
 * ACCESS [admin, manager]
 * POST /api/products/
 */
export async function createProduct (req: Request, res: Response): Promise<void> {
    const { body } = req;
    const product: TProduct = new ProductModel(body);
    await product.save();
    res.json({
        success: true,
        message: "Product created successfully.",
        data: product,
    });
}


/**
 * Delete a product.
 * ACCESS [admin, manager]
 * DELETE /api/products/:productId
 */
export async function deleteProduct (req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const { deletedCount } = await ProductModel.deleteOne({ _id: productId });
    if (!deletedCount) {
        throw new Error("Failed to delete product.");
    }
    res.json({
        success: true,
        message: "Product deleted successfully.",
    });
}


/**
 * Get many products.
 * ACCESS OPEN
 * GET /api/products
 */
export async function getProducts (req: Request, res: Response): Promise<void> {
    const { page = 1, size = 8, keyword } = req.query;
    const searchQuery = keyword
        ? {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        } : {};

    const count = await ProductModel.countDocuments({ isActive: true, ...searchQuery });
    const products: TProduct[] = await ProductModel
        .find({ isActive: true, ...searchQuery })
        .limit(+size)
        .skip((+page - 1) * +size)
        .populate([ "thumbnail", "category" ]);

    res.json({
        success: true,
        message: `${products.length} product${products.length === 1 ? "" : "s"} found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: products,
    });
}


/**
 * Get products on sale.
 * ACCESS OPEN
 * GET /api/products/on-sale/
 */
export async function getProductsOnSale (req: Request, res: Response): Promise<void> {
    const { page = 1, size = 8 } = req.query;

    const count = await ProductModel.countDocuments({ onSale: true, isActive: true });
    const products: TProduct[] = await ProductModel
        .find({ onSale: true, isActive: true })
        .limit(+size)
        .skip((+page - 1) * +size)
        .populate([ "thumbnail", "category" ]);

    res.json({
        success: true,
        message: `${products.length} product${products.length === 1 ? "" : "s"} found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: products,
    });
}


/**
 * Get inactive products.
 * ACCESS [admin, manager]
 * GET /api/products/inactive/
 */
export async function getInactiveProducts (req: Request, res: Response): Promise<void> {
    const { page = 1, size = 8 } = req.query;

    const count = await ProductModel.countDocuments({ isActive: false });
    const products: TProduct[] = await ProductModel
        .find({ isActive: false })
        .limit(+size)
        .skip((+page - 1) * +size)
        .populate([ "thumbnail", "category" ]);

    res.json({
        success: true,
        message: `${products.length} product${products.length === 1 ? "" : "s"} found.`,
        meta: {
            pageCount: Math.ceil(count / +size),
            page: +page,
            size: +size,
        },
        data: products,
    });
}


/**
 * Get product by id.
 * ACCESS OPEN
 * GET /api/products/:productId
 */
export async function getProductById (req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const product: TProduct | null = await ProductModel.findById(productId).populate([ "thumbnail", "gallery", "category", { path: "reviews.user", select: "name avatar.url" } ]);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    res.json({
        success: true,
        data: product,
    });
}


/**
 * Update a product
 * ACCESS [admin, manager]
 * PUT /api/products/:productId
 */
export async function updateProduct (req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const { body } = req;
    const product: TProduct | null = await ProductModel.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    product.set(body);
    await product.save();
    res.json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
}


/**
 * Patch a single property of a product.
 * ACCESS [admin, manager]
 * PATCH /api/products/:productId
 */
export async function updateProductProperty (req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const { key, value } = req.body;
    const product: TProduct | null = await ProductModel.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    product.set(key, value);
    await product.save();
    res.json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
}


/**
 * Get all reviews of a product.
 * ACCESS OPEN
 * GET /api/products/:productId/reviews/
 */
export async function getProductReviews (req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const product: Pick<TProduct, "reviews"> | null = await ProductModel.findById(productId, [ "reviews" ]);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    res.json({
        success: true,
        data: product.reviews,
    })
    ;
}


/**
 * Add a new product review.
 * ACCESS User who got delivered an order containing that product.
 * POST /api/products/:productId/reviews/
 */
// todo Only user who got delivered an order containing the product can submit a review.
export async function submitReview (req: Request, res: Response): Promise<void> {
    const { body } = req;
    const { productId } = req.params;
    const product: TProduct | null = await ProductModel.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    const review: TProductReview = new ProductReviewModel({ ...body, user: req.user._id });
    product.reviews.unshift(review);
    await product.save();
    res.json({
        success: true,
        message: "Review submitted successfully.",
        data: review,
    });
}


/**
 * Delete a review.
 * ACCESS [admin, manager, review owner]
 * DELETE /api/products/:productId/reviews/:reviewId/
 */
export async function deleteReview (req: Request, res: Response): Promise<void> {
    const { productId, reviewId } = req.params;
    const { user } = req;
    const product: TProduct | null = await ProductModel.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    const review: TProductReview | undefined = product.reviews.find((document: TProductReview): boolean => {
        return document.id === reviewId;
    });
    if (!review) {
        res.status(404);
        throw new Error("Review not found.");
    }
    const isOwner: boolean = review.user.toString() === user.id;
    const isAdmin: boolean = ([ userRoles.Admin, userRoles.Manager ] as Array<UserRole>).includes(user.role);
    if (!isOwner || !isAdmin) {
        res.status(401);
        throw new Error("Unauthorized.");
    }
    product.reviews = product.reviews.filter((review): boolean => review.id !== reviewId);
    const result = await product.save();
    res.json({
        success: true,
        message: "Review deleted successfully.",
        data: result.reviews,
    });
}


/**
 * Edit a review.
 * ACCESS The review owner.
 * PATCH /api/products/:productId/reviews/:reviewId/
 */
export async function editReview (req: Request, res: Response): Promise<void> {
    const { productId, reviewId } = req.params;
    const { user, body } = req;
    const product: TProduct | null = await ProductModel.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    const review: TProductReview | undefined = product.reviews.find((review: TProductReview): boolean => {
        return review.id === reviewId;
    });
    if (!review) {
        res.status(404);
        throw new Error("Review not found.");
    } else if (review.user.toString() !== user.id) {
        res.status(401);
        throw new Error("You're not allowed to edit this review.");
    }
    delete body.user;
    review.set(body);
    await product.save();
    res.json({
        success: true,
        message: "Review updated successfully.",
        data: review,
    });
}