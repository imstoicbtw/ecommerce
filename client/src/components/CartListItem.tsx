import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid/index";
import { ArrowTopRightOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline/index";
import { type CartItem, decrementFromCart, incrementFromCart, removeFromCart } from "../redux/slices/cartSlice.ts";
import { useDispatch } from "react-redux";
import { Button } from "./Button.tsx";
import { Link } from "react-router-dom";


type Props = {
    cartItem: CartItem;
};

export const CartListItem = ({ cartItem }: Props) => {
    const { product, quantity } = cartItem;

    const dispatch = useDispatch();

    const handleRemoveFromCart = (): void => {
        dispatch(removeFromCart(product._id));
    };

    const handleIncrement = (): void => {
        dispatch(incrementFromCart(product._id));
    };

    const handleDecrement = (): void => {
        dispatch(decrementFromCart(product._id));
    };

    return (
        <li
            className={"relative flex md:gap-3 items- bg-blue-50 p-1 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-blue-100"}

        >
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.thumbnail.url}
                    alt={product.thumbnail.alt}
                    className={"size-20 sm:size-50 w-full h-full object-cover rounded-lg border-2 border-blue-100"}
                />
            </Link>
            <div className={"flex flex-col sm:gap-1 h-full ml-2 sm:ml-0 sm:p-3 justify-center"}>
                <Button
                    variant={"destructive"}
                    className={"absolute !p-1 sm:!p-1.5 !rounded-full right-1.5 sm:right-3 top-1.5 sm:top-3"}
                    size={"large"}
                    onClick={handleRemoveFromCart}
                ><TrashIcon /></Button>
                <Link to={`/product/${product._id}`} className={"link"}>
                    <h2 className={"font-semibold text-sm sm:text-xl flex gap-1 items-center leading-tight"}>
                        {product.name}
                        <ArrowTopRightOnSquareIcon className={"size-3"} />
                    </h2>
                </Link>
                <div className={"sm:mt-1"}>
                    {!product.onSale
                        ? <p className={"text-xl sm:text-3xl font-bold"}>
                            <span className={"font-light text-xl sm:text-3xl mr-1"}>$</span>
                            <span>{product.price}</span>
                            <span className={"font-light text-xl sm:text-3xl"}>/-</span>
                        </p>
                        : <div>
                            <p>
                                <span className={"text-green-600 font-bold mr-2 sm:mr-3 text-xl sm:text-3xl"}>
                                    <span className={"font-light mr-1"}>$</span>
                                    <span>{product.salePrice}</span>
                                    <span className={"font-light"}>/-</span>
                                </span>
                                <span className={"text-slate-500 font-bold text-lg sm:text-2xl"}>
                                    <span className={"font-light"}>$</span>
                                    <span className={"line-through"}>{product.price}</span>
                                    <span className={"font-light"}>/-</span>
                                </span>
                            </p>
                            <p className={"text-xs sm:text-sm"}>
                                    <span className={"py-0.5 px-1.5 rounded-full bg-blue-500 text-white font-semibold"}>
                                        {Math.round((product.salePrice! / product.price) * 100)}%
                                    </span>
                                <span className={"font-medium text-blue-500 ml-2"}>You would save ${product.price - product.salePrice!} on this product.</span>
                            </p>
                        </div>
                    }
                </div>
                <div className={"mt-1.5 sm:mt-3"}>
                    <div className={"flex gap-2"}>
                        <div className={"inline-grid grid-cols-4 sm:p-1 border-2 border-blue-100 rounded-lg"}>
                            <button className={`bg-blue-100 ${quantity === 1 || !product.stock ? "cursor-not-allowed" : "hover:bg-blue-200 cursor-pointer"} rounded-sm grid place-items-center`} onClick={handleDecrement} disabled={quantity === 1 || !product.stock}>
                                <MinusIcon className={"size-3 sm:size-4"} />
                            </button>
                            <span className={"col-span-2 grid place-items-center font-medium text-xs sm:text-base"}>{quantity}</span>
                            <button className={`p-1.5 bg-blue-100  ${(quantity >= product.stock) ? "cursor-not-allowed" : "hover:bg-blue-200 cursor-pointer"}  rounded-sm grid place-items-center`} onClick={handleIncrement} disabled={quantity >= product.stock}>
                                <PlusIcon className={"size-3 sm:size-4"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};