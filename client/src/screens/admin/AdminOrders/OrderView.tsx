import { ArrowPathIcon } from "@heroicons/react/16/solid/index";
import { orderStatuses } from "common/dist/index.js";
import type { IOrderRawDoc } from "common/dist/mongoose/order.types.ts";
import type { IPaymentRawDoc } from "common/dist/mongoose/payment.types.ts";
import type { IUserRawDoc } from "common/dist/mongoose/user.types.ts";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../../components/Avatar/index.tsx";
import { Button } from "../../../components/Button.tsx";
import Dialog from "../../../components/Dialog/index.tsx";
import { Loader } from "../../../components/Loader.tsx";
import { SelectInput } from "../../../components/SelectInput.tsx";
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from "../../../redux/query/ordersApiSlice.ts";


type Order = Omit<IOrderRawDoc, "products" | "payment" | "user"> & { _id: string } & {
    products: { price: number, quantity: number, savedAmount: number, product: { name: string, thumbnail: { url: string } } }[],
    payment: IPaymentRawDoc & { _id: string },
    user: Pick<IUserRawDoc, "name" | "email" | "avatar"> & { _id: string },
    createdAt: string;
};

export function OrderView () {
    const { orderId } = useParams();
    const [ updateOrderStatus ] = useUpdateOrderStatusMutation();

    const { data: orderData, isLoading: loadingOrder, error: OrderError, refetch: refetchOrder } = useGetOrderByIdQuery(orderId!, { skip: !orderId });

    const changeOrderStatusButtonRef = useRef<HTMLButtonElement | null>(null);

    const [ orderStatus, setOrderStatus ] = useState<typeof orderStatuses[number]>();

    useEffect(() => {
        setOrderStatus(orderData?.data?.status);
    }, [ orderData ]);

    const handleUpdateOrderStatus = async () => {
        if (!orderId || !orderStatus) return { success: false, message: "Order ID or status is missing." };
        try {
            const response = await updateOrderStatus({ orderId, status: orderStatus });
            if (!response?.data?.success) throw new Error(response?.data?.message);
            const newOrderStatus = response?.data?.data?.status;
            setOrderStatus(newOrderStatus);
            refetchOrder();
            return { success: true, message: `Order status updated to '${newOrderStatus.toUpperCase()}' successfully.` };
        } catch (error: any) {
            return { success: false, message: error?.message || "Something went wrong, please try again later..." };
        }
    };

    if (loadingOrder) return <Loader message={"Loading order..."} />;
    if (OrderError) return <div className={"text-red-500 italic"}>Error: Something went wrong, please try reloading the page.</div>;
    if (!orderData) return <div className={"text-red-500 italic"}>Error: Order not found.</div>;
    const order = orderData.data as Order;
    return (
        <main>
            <section>
                <h2 className={"*:block"}>
                    <span className={"text-xl font-bold"}>Order Details</span>
                    <span className={"uppercase"}># {orderId}</span>
                </h2>
            </section>
            <section className={"mt-6"}>
                <h3 className={"text-lg font-bold"}>Summary</h3>
                <ul className={"mt-3 grid grid-cols-1 gap-2"}>
                    <li className={"flex items-center gap-3"}>
                        <Avatar fallback={order.user.name.firstName} src={order.user.avatar.url} />
                        <div>
                            <p className={"text-lg font-semibold"}>{order.user.name.firstName} {order.user.name.lastName}</p>
                            <p className={"text-sm leading-none"}>{order.user.email}</p>
                        </div>
                    </li>
                    <li className={"flex gap-2 mt-1"}>
                        <span className={"font-semibold"}>Order Date:</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</span>
                    </li>
                    <li className={"flex gap-2"}>
                        <span className={"font-semibold"}>Order Total:</span>
                        <span>₹{order.totalAmount}</span>
                    </li>
                    <li className={"flex gap-2 items-center"}>
                        <span className={"font-semibold"}>Order Status:</span>
                        <span className={`flex uppercase text-sm border-2 rounded-full px-2 py-0.5 font-semibold ${order.status === "pending" ? "bg-yellow-100 text-yellow-600" : order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"}`}>
                            {order.status} &nbsp;| &nbsp;<Button variant={"plain"} ref={changeOrderStatusButtonRef} className={"!p-0"}><ArrowPathIcon className={"size-5"} /></Button>
                        </span>
                        <Dialog
                            trigger={changeOrderStatusButtonRef}
                            heading={"Change Order Status"}
                            submitLabel={"Update Status"}
                            submitAction={handleUpdateOrderStatus}
                        >
                            <SelectInput
                                name={"orderStatus"}
                                className={"capitalize"}
                                value={orderStatus}
                                label={"Select Order Status"}
                                description={`Select the new status for the order #${orderId}.`}
                                onChange={(event) => setOrderStatus(event.target.value as typeof orderStatus)}
                            >
                                {orderStatuses.map(status => (
                                    <option value={status}>{status}</option>
                                ))}
                            </SelectInput>
                        </Dialog>
                    </li>
                    <li className={"flex gap-2 capitalize"}>
                        <span className={"font-semibold"}>Payment Method:</span>
                        <span>{order.payment.paymentGateway}</span>
                    </li>
                </ul>
            </section>
            <section className={"mt-6"}>
                <h3 className={"text-lg font-bold mb-1"}>Address</h3>
                <address className={"not-italic"}>
                    <p className={"text-lg font-medium"}>{order.shippingAddress.name.firstName} {order.shippingAddress.name.lastName}</p>
                    <p>+{order.shippingAddress.countryCode} {order.shippingAddress.phoneNumber}</p>
                    <p>{order.shippingAddress.building}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pinCode}</p>
                </address>
            </section>
            <section className={"mt-6"}>
                <h3 className={"text-lg font-bold mb-1"}>Order Items</h3>
                <ul className={"mt-3 grid grid-cols-1 gap-2"}>
                    {order.products.map(product => (
                        <li className={"font-medium leading-tight flex items-center gap-3"}>
                            <img src={product.product.thumbnail.url} className={"size-20 object-cover rounded-xl border-2 border-slate-200"} alt={product.product.name} />
                            <div>
                                <p className={"text-lg font-semibold"}>{product.product.name}</p>
                                <p>Price: ₹{product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}