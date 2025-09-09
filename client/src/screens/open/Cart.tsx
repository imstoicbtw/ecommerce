import { CreditCardIcon } from "@heroicons/react/24/solid/index";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid/index";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button.tsx";
import { CartListItem } from "../../components/CartListItem.tsx";
import { type Store } from "../../redux/store.ts";


export function Cart () {
    const cart = useSelector((state: Store) => state.cart);

    if (!cart.items.length) return <main>
        <section className={"inner my-12 flex flex-col items-start gap-3"}>
            <p>Your cart is empty. Why not browse some amazing products?</p>
            <Button to={"/shop"} icon={BuildingStorefrontIcon}>Go to store &rarr;</Button>
        </section>
    </main>;

    return (
        <main>
            <section className={"inner mt-8 sm:mt-12"}>
                <h2 className={"text-2xl font-bold"}>Your Cart</h2>
                {!!cart.discountPrice && <p>Place the order now to save &nbsp;<span className={"font-semibold text-green-600 text-lg"}>${cart.discountPrice}.</span></p>}
            </section>
            <section className={"inner my-8 sm:my-12 grid lg:grid-cols-3 gap-5"}>
                <div className={"lg:col-span-2"}>
                    <ul className={"grid grid-cols-1 gap-5"}>
                        {cart.items.map((item) => (<CartListItem cartItem={item} key={"cart_item_" + item.product._id} />))}
                    </ul>
                </div>
                <div>
                    <div className={"sticky top-28 *:border-2 *:rounded-xl sm:*:rounded-2xl *:p-3 sm:*:p-5"}>
                        <ul className={"bg-blue-50 border-blue-100 *:flex *:justify-between *:items-center *:my-2"}>
                            <li>
                                <h3 className={"text-lg sm:text-xl font-bold"}>Subtotal</h3>
                                <p className={"text-xl sm:text-2xl font-bold"}>${cart.itemsPrice}</p>
                            </li>
                            <li>
                                <h3 className={"text-lg sm:text-xl font-bold"}>Shipping</h3>
                                <p className={`text-lg sm:text-xl font-bold ${cart.shippingPrice ? "" : "text-green-600"}`}>${cart.shippingPrice || "Free!"}</p>
                            </li>
                            <li>
                                <h3 className={"text-lg sm:text-xl font-bold"}>Tax (GST)</h3>
                                <p className={"text-lg sm:text-xl font-bold"}>${cart.taxPrice}</p>
                            </li>
                        </ul>
                        <ul className={"bg-blue-50 border-blue-100 mt-5 *:flex *:justify-between *:items-center"}>
                            <li>
                                <h3 className={"text-lg sm:text-xl font-bold"}>Total</h3>
                                <p className={"text-xl sm:text-2xl font-bold text-blue-500"}>${cart.totalPrice}</p>
                            </li>
                        </ul>
                        {!!cart.discountPrice && <ul className={"bg-green-100 border-green-200 mt-5 *:flex *:justify-between *:items-center"}>
                            <li>
                                <h3 className={"text-lg sm:text-xl font-bold"}>You Saved</h3>
                                <p className={"text-xl sm:text-2xl font-bold text-green-600"}>${cart.discountPrice}</p>
                            </li>
                        </ul>}
                        <Button
                            to={"/account/shipping"}
                            size={"large"}
                            icon={CreditCardIcon}
                            className={"tracking-widest w-full font-semibold gap-3 mt-5"}
                        >CONTINUE</Button>
                    </div>
                </div>
            </section>
        </main>
    );
}