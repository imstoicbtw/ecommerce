import type { IProductRawDoc } from "common/dist/mongoose/product.types.ts";
import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import { Link } from "react-router-dom";
import Rating from "./Rating.tsx";


type Props = {
    product: Omit<IProductRawDoc, "category" | "thumbnail" | "gallery"> & {
        _id: string;
        category: { name: string, slug: string };
        thumbnail: { url: string };
        gallery?: Array<IMediaRawDoc & { _id: string }>;
    };
}

export default function ProductCard ({ product }: Props) {

    const { _id: productId, name, thumbnail, category, onSale, salePrice, price, description, reviews } = product;

    return (
        <li className={"list-none"}>
            <Link to={`/product/${productId}`} className={"bg-blue-50 block rounded-xl md:rounded-3xl p-1 md:p-3 border-2 border-blue-100 hover:bg-blue-100 hover:shadow-xl"}>
                <div style={{ backgroundImage: `url(${thumbnail.url})` }} className={"flex items-end  rounded-lg md:rounded-xl aspect-square p-2 bg-cover"}>
                    <span className={"text-[8px] md:text-xs uppercase px-1.5 pt-0.5 rounded-full bg-blue-100 border-2 border-blue-200 text-blue-600 font-semibold"}>
                        {category.name}
                    </span>
                </div>
                <div className={"mt-2 flex justify-between items-center gap-2"}>
                    <div className={"w-2/3"}>
                        <h2 className={"text-xs md:text-base font-semibold w-full !truncate"} title={name}>{name}</h2>
                        <Rating reviews={reviews} />
                    </div>
                    <div className={"w-1/3"}>
                        {onSale ? (
                            <div className={"flex flex-col gap-1 items-end"}>
                                <p className={"text-xs md:text-base text-slate-500 font-semibold line-through leading-none"}>${price}</p>
                                <p className={"text-sm md:text-lg text-green-600 font-bold leading-none"}>${salePrice}</p>
                            </div>
                        ) : (
                            <p className={"text-sm md:text-lg text-slate-700 font-semibold text-right"}>${price}</p>
                        )}
                    </div>
                </div>
                <div>
                    <p className={"text-[10px] leading-tight md:text-xs mt-1 line-clamp-2"}>{description}</p>
                </div>
            </Link>
        </li>
    );
}