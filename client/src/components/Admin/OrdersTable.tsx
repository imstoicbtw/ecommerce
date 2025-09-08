import { MapPinIcon, PhoneArrowUpRightIcon } from "@heroicons/react/16/solid/index";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline/index";
import type { IOrderRawDoc } from "common/dist/mongoose/order.types.ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


type Props = {
    receivedOrders: Array<IOrderRawDoc & { _id: string }>;
}

export function OrdersTable ({ receivedOrders }: Props) {

    const [ orders, setOrders ] = useState<typeof receivedOrders>(receivedOrders);

    useEffect(() => {
        setOrders(receivedOrders);
    }, [ receivedOrders ]);

    return (
        <table className={"w-full border-separate border-spacing-y-3 text-left"}>
            <thead>
            <tr className={"*:bg-blue-100 *:text-slate-700 *:p-2 rounded-lg"}>
                <th>Customer</th>
                <th>Status</th>
                <th>Order Id</th>
                <th>Cart Value</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order._id} className={`*:text-slate-700 leading-tight`}>
                    <td>
                        <p className={"text-lg font-semibold"}>
                            {order.shippingAddress.name.firstName} {order.shippingAddress.name.lastName}
                        </p>
                        <p className={"text-sm flex gap-2 items-center"}>
                            <a href={`tel:${order.shippingAddress.countryCode}${order.shippingAddress.phoneNumber}`} className={"flex items-center gap-1 link"}>
                                <PhoneArrowUpRightIcon className={"size-3"} />
                                <span>+{order.shippingAddress.countryCode} {order.shippingAddress.phoneNumber}</span>
                            </a>
                            <span className={"flex items-center gap-1"}>
                                <MapPinIcon className={"size-3"} />
                                <span>{order.shippingAddress.pinCode}</span>
                            </span>
                        </p>
                    </td>
                    <td>
                        <span className={`px-2 py-0.5 rounded-full uppercase text-sm font-semibold border-2 ${order.status === "pending" ? "bg-yellow-100 text-yellow-600" : order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"}`}>{order.status}</span>
                    </td>
                    <td className={"text-center"}>
                        <Link to={`/dashboard/orders/order/${order._id}`} className={"flex items-center gap-1 link"}>
                            <span>{order._id}</span>
                            <ArrowTopRightOnSquareIcon className={"size-4"} />
                        </Link>
                    </td>
                    <td className={"text-right text-lg font-semibold"}>
                        ₹{order.totalAmount}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

}