import { MinusIcon, PlusIcon, SparklesIcon } from "@heroicons/react/16/solid/index";
import { HomeIcon } from "@heroicons/react/20/solid/index";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline/index";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid/index";
import { ChevronRightIcon, PercentBadgeIcon, ShoppingBagIcon, Squares2X2Icon } from "@heroicons/react/24/solid/index";
import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import type { IProductRawDoc, IProductReviewRawDoc } from "common/dist/mongoose/product.types.ts";
import type { INameRawDoc } from "common/dist/mongoose/user.types.ts";
import { submitReviewReqBody } from "common/dist/zod/requests/product.zod.js";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import Avatar from "../../components/Avatar/index.tsx";
import { Button } from "../../components/Button.tsx";
import Gallery from "../../components/Gallery/index.tsx";
import { Loader } from "../../components/Loader.tsx";
import ProductCard from "../../components/ProductCard/index.tsx";
import Rating from "../../components/ProductCard/Rating.tsx";
import { useGetCategoryProductsByIdQuery } from "../../redux/query/categoriesApiSlice.ts";
import { useGetProductByIdQuery, useSubmitProductReviewMutation } from "../../redux/query/productsApiSlice.ts";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input.tsx";
import { TextArea } from "../../components/TextArea.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, type CartItem } from "../../redux/slices/cartSlice.ts";
import { addRecentlyViewedItem, type RecentlyViewedItem } from "../../redux/slices/recentlyViewedSlice.ts";
import type { Store } from "../../redux/store.ts";


type Product = Omit<IProductRawDoc, "category" | "thumbnail" | "gallery"> & {
    _id: string;
    category: { name: string, slug: string };
    thumbnail: IMediaRawDoc & { _id: string } | null;
    gallery: Array<IMediaRawDoc & { _id: string }>;
};

type ProductReview = Omit<IProductReviewRawDoc, "user"> & {
    user: { avatar: { url: string }, name: INameRawDoc };
    _id: string;
};

export function ProductPage () {

    const { productId } = useParams();
    const userId = useSelector((state: Store) => state.user.details);

    const dispatch = useDispatch();
    const productInCart = useSelector((state: any) => state.cart.items?.find((item: CartItem) => item.product._id === productId));

    const [ quantity, setQuantity ] = useState<number>(1);
    const [ reviewForm, setReviewForm ] = useState<{ title: string, comment: string, rating: number }>({
        title: "",
        comment: "",
        rating: 0,
    });

    const { data: fetchedProduct, isLoading: loadingProduct, error: productError } = useGetProductByIdQuery(productId!, {
        skip: !productId,
        refetchOnMountOrArgChange: true,
    });
    const { data: fetchedCategoryProducts } = useGetCategoryProductsByIdQuery(fetchedProduct?.data?.category._id, {
        skip: !fetchedProduct?.data?.category._id,
        refetchOnMountOrArgChange: true,
    });
    const [ submitReview, { isLoading: loadingReviewMutation } ] = useSubmitProductReviewMutation();

    const handleReviewInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setReviewForm(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const parsed = submitReviewReqBody.safeParse(reviewForm);
            if (!parsed.success) throw new Error("Some required fields are missing.");
            const result = await submitReview({ productId: productId!, ...parsed.data }).unwrap();
            if (!result.success) throw new Error(result.message);
            toast.success("Review submitted successfully!");
            setReviewForm({ title: "", comment: "", rating: 0 });
        } catch (error: any) {
            toast.error(error?.message || error?.data?.message || "An error occurred while submitting your review.");
        }
    };

    const handleAddToCart = (cartItem: CartItem) => {
        const result = dispatch(addToCart(cartItem));
        if (!result.payload) toast.error("Unable to add to cart. Please try again later.");
        else toast.success(`Product added to cart successfully! \n Quantity added: ${cartItem.quantity}`);
        setQuantity(1);
    };

    if (productError) return <main>Error: {productError && "message" in productError ? productError.message : "Something went wrong, please try reloading the page."}</main>;
    if (loadingProduct || !fetchedProduct) return <Loader message={"An amazing product is loading..."} />;

    const { name, _id, category, isActive, gallery, price, thumbnail, salePrice, onSale, reviews, description, stock } = fetchedProduct.data as Product;
    const relatedProducts: Product[] = fetchedCategoryProducts?.data?.filter((product: Product) => product._id !== _id && product.isActive);

    if (!isActive) return <main>Product is not available.</main>;

    const cartItem: CartItem = {
        product: { _id, name, thumbnail, price, onSale, salePrice, stock, isActive },
        quantity,
    };
    const recentlyViewedItem: RecentlyViewedItem = {
        _id,
        name,
        salePrice,
        stock,
        isActive,
        onSale,
        reviews,
        description,
        price,
        thumbnail,
        category,
    };
    setTimeout(() => {
        dispatch(addRecentlyViewedItem(recentlyViewedItem));
    }, 1000);
    console.log(fetchedProduct);
    return (
        <main className={"py-12"}>
            <section className={"inner grid lg:grid-cols-2 gap-10 text-slate-700"}>
                <div className={"lg:sticky top-0"}>
                    <Gallery
                        gallery={[
                            thumbnail,
                            ...gallery.filter(item => item._id !== thumbnail?._id),
                        ]}
                    />
                </div>
                <div>
                    <nav className={"flex items-center gap-x-2 text-sm font-medium flex-wrap"}>
                        <Link to={"/"}><HomeIcon className={"size-4 sm:size-5 -mt-0.5 hover:text-blue-600"} /></Link>
                        <ChevronRightIcon className={"size-3"} />
                        <Link to={`/product-category/${category.slug}`} className={"link"}>{category.name}</Link>
                        <ChevronRightIcon className={"size-3"} />
                        <span className={"text-slate-600"}>{name}</span>
                    </nav>
                    <div className={"mt-5 flex items-center gap-2 flex-wrap"}>
                        <Link to={`/product-category/${category.slug}`} className={"text-xs sm:text-sm uppercase px-2 py-1 rounded-full bg-blue-100 border-2 border-blue-200 text-blue-600 font-semibold hover:bg-blue-200 hover:text-blue-700 inline-flex items-center gap-1"}>
                            <Squares2X2Icon className={"size-3"} />
                            <span>{category.name}</span>
                        </Link>
                        {onSale && (
                            <div className={"text-xs sm:text-sm uppercase px-2 py-1 rounded-full bg-green-100 border-2 border-green-200 text-green-600 font-semibold inline-flex items-center gap-1"}>
                                <PercentBadgeIcon className={"size-4"} />
                                <span>On sale</span>
                            </div>
                        )}
                    </div>
                    <div className={"mt-5"}>
                        <h1 className={"text-xl sm:text-3xl font-bold"}>{name}</h1>
                    </div>
                    <div className={"mt-3"}>
                        <Rating reviews={reviews} expanded />
                    </div>
                    <div className={"mt-5"}>
                        {!onSale
                            ? <p className={"text-3xl sm:text-5xl font-bold"}>
                                <span className={"mr-1"}>$</span>
                                <span>{price}</span>
                                <span className={"font-light text-2xl sm:text-4xl"}>/-</span>
                            </p>
                            : <div>
                                <p>
                                <span className={"text-green-600 text-3xl sm:text-5xl font-bold mr-3"}>
                                    <span className={"font-light"}>$</span>
                                    <span>{salePrice}</span>
                                    <span className={"font-light"}>/-</span>
                                </span>
                                    <span className={"text-slate-500 text-2xl sm:text-4xl font-bold"}>
                                    <span className={"font-light"}>$</span>
                                    <span className={"line-through"}>{price}</span>
                                    <span className={"font-light"}>/-</span>
                                </span>
                                </p>
                                <p className={"mt-2"}>
                                    <span className={"py-1 px-2 text-sm sm:text-base rounded-full bg-blue-500 text-white font-bold"}>
                                        {Math.round((salePrice! / price) * 100 - 100)}%
                                    </span>
                                    <span className={"font-medium text-sm sm:text-base text-blue-500 ml-2"}>You would save ${price - salePrice!} on this product.</span>
                                </p>
                            </div>
                        }
                    </div>
                    <div className={"mt-5 text-blue-600"}>
                        <div className={"flex gap-2"}>
                            <div className={"inline-grid grid-cols-4 p-1 border-2 border-blue-100 rounded-lg"}>
                                <button className={`bg-blue-100 ${quantity === 1 || !stock ? "cursor-not-allowed" : "hover:bg-blue-200 cursor-pointer"} rounded-sm grid place-items-center`} onClick={() => setQuantity(prev => --prev)} disabled={quantity === 1 || !stock}>
                                    <MinusIcon className={"size-4"} />
                                </button>
                                <span className={"col-span-2 grid place-items-center font-medium"}>{quantity}</span>
                                <button className={`p-1.5 bg-blue-100  ${(quantity >= (productInCart ? stock - productInCart.quantity : stock) || !stock) ? "cursor-not-allowed" : "hover:bg-blue-200 cursor-pointer"}  rounded-sm grid place-items-center`} onClick={() => setQuantity(prev => ++prev)} disabled={quantity >= (productInCart ? stock - productInCart.quantity : stock) || !stock}>
                                    <PlusIcon className={"size-4"} />
                                </button>
                            </div>
                            <Button
                                size={"large"} icon={ShoppingBagIcon} disabled={!stock}
                                onClick={() => handleAddToCart(cartItem)}
                            >Add To Cart</Button>
                        </div>
                        {!!stock && <p className={"mt-2 italic text-slate-700"}>{quantity} selected and {productInCart ? productInCart.quantity : 0} in cart.</p>}
                    </div>
                    <div className={"mt-5"}>
                        <div className={"leading-none mt-3"}>
                            {!stock ? <>
                                <p className={"text-lg font-semibold text-red-600"}>Out of stock</p>
                                <p className={"text-red-600"}>This product is currently out of stock and will be back soon.</p>
                            </> : <>
                                <p className={`text-lg font-semibold ${stock <= 10 ? "text-yellow-600" : "text-green-600"}`}>In stock</p>
                                <p className={` ${stock <= 10 ? "text-yellow-600" : "text-green-600"}`}>{stock <= 10 && "Only"} {stock} items in stock.</p>
                            </>}
                        </div>
                    </div>
                    <div className={"mt-5"}>
                        <p>{description}</p>
                    </div>
                </div>
            </section>
            <section className={"inner mt-16 grid md:grid-cols-2 gap-10"}>
                <div>
                    <h2 className={"text-2xl font-bold"}>Your Rating</h2>
                    {!userId
                        ? <p>Please login to submit a review.</p>
                        : <form
                            onSubmit={handleRatingSubmit}
                            className={"grid gap-5 mt-4"}
                        >
                            <div className={"flex text-yellow-600"}>
                                {([ 1, 2, 3, 4, 5 ]).map(rate => (
                                    rate > reviewForm.rating ? <StarIconOutline
                                        key={`product_rate_empty_${rate}_${_id}`}
                                        className={"size-8 cursor-pointer"}
                                        onClick={() => setReviewForm(prev => ({ ...prev, rating: rate }))}
                                    /> : <StarIconSolid
                                        key={`product_rate_filled_${rate}_${_id}`}
                                        className={"size-8 cursor-pointer"}
                                        onClick={() => setReviewForm(prev => ({ ...prev, rating: rate }))}
                                    />
                                ))}
                            </div>
                            <Input
                                label={"Title"}
                                name={"title"}
                                value={reviewForm.title}
                                placeholder={"Review title"}
                                onChange={handleReviewInputChange}
                                description={"Title must be at least 10 characters long."}
                            />
                            <TextArea
                                label={"Comment"}
                                name={"comment"}
                                value={reviewForm.comment}
                                placeholder={"What did you liked or disliked about this product?"}
                                onChange={handleReviewInputChange}
                                description={"Description must be at least 20 characters long."}
                            />
                            <Button
                                className={"justify-self-start"}
                                icon={SparklesIcon}
                                variant={"success"}
                                loading={loadingReviewMutation}
                            >Submit Review</Button>
                        </form>
                    }
                </div>
                <div>
                    <h2 className={"text-2xl font-bold mb-4"}>Ratings & Reviews</h2>
                    <Rating reviews={reviews} expanded />
                    {!!reviews.length && (
                        <ul className={"mt-5"}>
                            {(reviews as unknown as ProductReview[]).map((review: ProductReview) => (
                                <li key={review._id} className={"flex gap-2 my-5 items-start"}>
                                    <Avatar fallback={review.user.name.firstName} src={review.user.avatar.url} className={"min-w-max"} />
                                    <div>
                                        <p className={"font-medium"}>
                                            {review.user.name.firstName} {review.user.name.lastName}
                                        </p>
                                        <Rating single={review.rating} reviews={reviews} />
                                        <p className={"text-sm mt-1 leading-tight"}>{review.comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
            {!!relatedProducts?.length && <section className={"inner mt-16"}>
                <h2 className={"text-2xl font-bold"}>Related Products</h2>
                <ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5 mt-5"}>
                    {relatedProducts.map((product: Product) => (
                        <ProductCard product={product} key={"related_" + product._id} />
                    ))}
                </ul>
            </section>}
        </main>
    );
}