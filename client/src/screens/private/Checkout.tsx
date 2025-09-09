import { BanknotesIcon } from "@heroicons/react/24/outline/index";
import { XMarkIcon } from "@heroicons/react/24/solid/index";
import { createOrderReqBody, type createOrderReqBodyType } from "common/dist/zod/requests/order.zod.js";
import { useEffect } from "react";
import { Button } from "../../components/Button.tsx";
import { useCreateOrderMutation } from "../../redux/query/ordersApiSlice.ts";
import type { Store } from "../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { Link } from "react-router-dom";
import { clearFromCart } from "../../redux/slices/cartSlice.ts";


export function Checkout () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ createOrder, { isLoading: loadingOrderMutation } ] = useCreateOrderMutation();
    const { items, ...cart } = useSelector((state: Store) => state.cart);

    useEffect(() => {
        if (!cart.address) {
            toast.warn("Please select an address.");
            navigate("/account/shipping");
            return;
        } else if (!items.length) {
            toast.warn("Please add some products to the cart.");
            navigate("/cart");
            return;
        }
    }, []);

    const handleCreateOrder = async () => {
        const order: createOrderReqBodyType = {
            products: items.map(item => ({
                product: item.product._id,
                price: item.product.onSale && item.product.salePrice ? item.product.salePrice : item.product.price,
                savedAmount: item.product.onSale && item.product.salePrice ? item.product.price - item.product.salePrice : 0,
                quantity: item.quantity,
            })),
            subTotal: cart.itemsPrice,
            totalAmount: cart.totalPrice,
            savedAmount: cart.discountPrice,
            shippingAmount: cart.shippingPrice,
            taxAmount: cart.taxPrice,
            status: "pending",
            shippingAddress: cart.address!,
        };
        const result = createOrderReqBody.safeParse(order);
        if (!result.success) {
            toast.error("Something went wrong, please try again later...");
            return;
        }
        try {
            const response = await createOrder(order);
            if (!response.data?.success) throw new Error(response.data?.message);
            toast.success(response.data.message);
            dispatch(clearFromCart());
            navigate(`/account/pay/${response.data.data._id}`);
        } catch (error: any) {
            toast.error(error?.message || error?.data?.message || "Something went wrong, please try again later...");
            return;
        }
    };

    return (
        <main>
            <section className={"inner mt-12"}>
                <h2 className={"text-2xl font-bold"}>Place Order</h2>
                <p>Confirm you order and continue to payment.</p>
            </section>
            <section className={"inner my-10"}>
                <h3 className={"text-xl font-semibold"}>Products</h3>
                <ul className={"pt-3 grid gap-2"}>
                    {items?.map(({ product, quantity }) => <li
                            className={"relative flex gap-3 items-center bg-blue-50 p-1 sm:p-3 rounded-2xl border-2 border-blue-100"}

                        >
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={product.thumbnail.url}
                                    alt={product.thumbnail.alt}
                                    className={"size-20 object-cover rounded-xl sm:rounded-lg border-2 border-blue-100"}
                                />
                            </Link>
                            <div className={"flex flex-col gap-1 h-full justify-center"}>
                                <Link to={`/product/${product._id}`} className={"link"}>
                                    <h2 className={"font-semibold text-lg flex gap-2 items-center"}>
                                        {product.name}
                                        <XMarkIcon className={"size-5"} />
                                        {quantity}
                                    </h2>
                                </Link>
                                <div>
                                    {!product.onSale
                                        ? <p className={"text-xl font-bold"}>
                                            <span className={"font-light mr-1"}>$</span>
                                            <span>{product.price}</span>
                                            <span className={"font-light"}>/-</span>
                                        </p>
                                        : (<div>
                                            <p>
                                                <span className={"text-green-600 font-bold mr-2 text-xl"}>
                                                    <span className={"font-light"}>$</span>
                                                    <span>{product.salePrice}</span>
                                                    <span className={"font-light"}>/-</span>
                                                </span>
                                                <span className={"text-slate-500 font-bold text-lg"}>
                                                    <span className={"font-light"}>$</span>
                                                    <span className={"line-through"}>{product.price}</span>
                                                    <span className={"font-light"}>/-</span>
                                                </span>
                                            </p>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </li>,
                    )}
                </ul>
            </section>
            <section className={"inner my-10"}>
                <h3 className={"text-xl font-semibold mb-3"}>Shipping Address</h3>
                <div>
                    <p className={"text-lg"}>{cart.address?.name.firstName} {cart.address?.name.lastName}</p>
                    <p>+{cart.address?.countryCode} {cart.address?.phoneNumber}</p>
                    <p>{cart.address?.building}, {cart.address?.street}, {cart.address?.city}, {cart.address?.state}, {cart.address?.country} - {cart.address?.pinCode}</p>
                </div>
            </section>
            <section className={"inner my-10"}>
                <Button
                    size={"large"}
                    icon={BanknotesIcon}
                    className={"gap-2"}
                    onClick={handleCreateOrder}
                    loading={loadingOrderMutation}
                >Pay ${cart.totalPrice} &rarr;</Button>
            </section>
        </main>
    );
}