import { useEffect } from "react";
import { toast } from "react-toastify/unstyled";
import { Loader } from "../../../components/Loader.tsx";
import { useGetMyOrderByIdQuery, useUpdateOrderStatusMutation } from "../../../redux/query/ordersApiSlice.ts";
import { useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useCreatePaymentMutation } from "../../../redux/query/paymentApiSlice.ts";


type Props = {
    paypalClientId: string;
}

export function Screen ({ paypalClientId }: Props) {
    const { orderId } = useParams();

    const { data: order, isLoading: loadingOrder, error: orderError, refetch: refetchOrder } = useGetMyOrderByIdQuery(orderId!);

    const [ createPayment, { isLoading: loadingPaymentMutation } ] = useCreatePaymentMutation();
    const [ updateOrderStatus ] = useUpdateOrderStatusMutation();
    const [ { isPending }, paypalDispatch ] = usePayPalScriptReducer();


    useEffect(() => {
        if (!paypalClientId) return;
        const loadPaypalScript = async () => {
            paypalDispatch({
                // @ts-expect-error ***
                type: "resetOptions",
                value: {
                    clientId: paypalClientId,
                    currency: "USD",
                },
            });
            // @ts-expect-error ***
            paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        };
        if (!window.paypal && order && !order?.data?.payment) {
            loadPaypalScript();
        }
    }, [ paypalDispatch, order, loadingPaymentMutation, paypalClientId ]);


    // const details = {
    //     "id": "87J90914F56206641",
    //     "intent": "CAPTURE",
    //     "status": "COMPLETED",
    //     "purchase_units": [
    //         {
    //             "reference_id": "default",
    //             "amount": {
    //                 "currency_code": "USD",
    //                 "value": "5000.00",
    //             },
    //             "payee": {
    //                 "email_address": "sb-rwtje46010512@business.example.com",
    //                 "merchant_id": "3HXD45GZBF7HC",
    //             },
    //             "soft_descriptor": "PAYPAL *TEST STORE",
    //             "shipping": {
    //                 "name": {
    //                     "full_name": "Sufiyan Mulla",
    //                 },
    //                 "address": {
    //                     "address_line_1": "Mahalaxmi Puram, Shindoli",
    //                     "admin_area_2": "Pheonix",
    //                     "admin_area_1": "AZ",
    //                     "postal_code": "85001",
    //                     "country_code": "US",
    //                 },
    //             },
    //             "payments": {
    //                 "captures": [
    //                     {
    //                         "id": "4GT53145L08967528",
    //                         "status": "COMPLETED",
    //                         "amount": {
    //                             "currency_code": "USD",
    //                             "value": "5000.00",
    //                         },
    //                         "final_capture": true,
    //                         "seller_protection": {
    //                             "status": "NOT_ELIGIBLE",
    //                         },
    //                         "create_time": "2025-09-06T12:44:38Z",
    //                         "update_time": "2025-09-06T12:44:38Z",
    //                     },
    //                 ],
    //             },
    //         },
    //     ],
    //     "payer": {
    //         "name": {
    //             "given_name": "Sufiyan",
    //             "surname": "Mulla",
    //         },
    //         "email_address": "anuriadey@gmail.com",
    //         "payer_id": "P8MMLJENGKMAC",
    //         "address": {
    //             "country_code": "US",
    //         },
    //     },
    //     "create_time": "2025-09-06T12:42:17Z",
    //     "update_time": "2025-09-06T12:44:38Z",
    //     "links": [
    //         {
    //             "href": "https://api.sandbox.paypal.com/v2/checkout/orders/87J90914F56206641",
    //             "rel": "self",
    //             "method": "GET",
    //         },
    //     ],
    // };


    const onApprove = (_data: any, actions: any) => {
        return actions.order.capture().then(async function (details: any) {
            try {
                const payment = await createPayment({
                    order: orderId!,
                    amount: details.purchase_units[0].amount.value,
                    transactionId: details.id,
                    status: details.status.toLowerCase(),
                    update_time: details.update_time,
                    email_address: details.payer.email_address,
                    paymentGateway: "paypal",
                });
                if (!payment.data?.success) throw new Error(payment.data?.message);
                updateOrderStatus({ orderId: orderId!, status: "processing", payment: payment.data.data._id });
                refetchOrder();
                toast.success("Order paid successfully.");
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong, please try again later...");
            }
        });
    };

    const onError = (error: any) => {
        console.error("Error: ", error);
        toast.error(error?.message || error?.data?.message || "Something went wrong, please try again later...");
    };

    const createOrder = (_data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [ { amount: { value: order.data.totalAmount } } ],
        }).then((orderId: any) => orderId);
    };


    if (loadingOrder || isPending) return <Loader message={"Loading order, please wait..."} />;
    else if (orderError) return <main className={"text-red-500"}>Something went wrong, please try again later...</main>;
    return (
        <main>
            <section className={"inner mt-12"}>
                <h2 className={"text-2xl font-bold"}>Order Summary</h2>
                <p>Your order has been placed successfuly, please complete the payment so that we can start processing your order. </p>
            </section>
            <section className={"inner grid grid-cols-2 gap-5 my-12"}>
                <div>
                    <div>
                        <h3 className={"text-xl  font-bold"}>Shipping address:</h3>
                        <address className={"not-italic"}>
                            <p className={"text-lg"}>{order.data.shippingAddress.name.firstName} {order.data.shippingAddress.name.lastName}</p>
                            <p>+{order.data.shippingAddress.countryCode} {order.data.shippingAddress.phoneNumber}</p>
                            <p>{order.data.shippingAddress.building}, {order.data.shippingAddress.street}, {order.data.shippingAddress.city}, {order.data.shippingAddress.state}, {order.data.shippingAddress.country} - {order.data.shippingAddress.pinCode}</p>
                        </address>
                    </div>
                    <div className={"mt-6"}>
                        <h3 className={"text-xl font-bold"}>Order status:</h3>
                        <p className={"text-lg"}>Order ID: <span className={"uppercase"}>{order.data._id}</span></p>
                        <p className={"text-lg capitalize"}>Status: <span className={"text-yellow-600"}>{order.data.status}</span></p>
                        <p className={"text-lg capitalize"}>Payment status: <span className={"text-green-600"}>{order.data.payment ? order.data.payment?.status : "Pending"}</span></p>
                    </div>
                </div>
                <div className={"bg-blue-50 border-2 border-blue-100 rounded-3xl p-10"}>
                    <ul className={"mb-6"}>
                        <li className={"flex justify-between font-semibold text-xl"}>
                            <h4>Subtotal</h4>
                            <p>₹{order.data.subTotal}</p>
                        </li>
                        <li className={"flex justify-between font-semibold text-xl"}>
                            <h4>Shipping</h4>
                            <p>₹{order.data.shippingAmount}</p>
                        </li>
                        <li className={"flex justify-between font-semibold text-xl"}>
                            <h4>Tax (18%)</h4>
                            <p>₹{order.data.taxAmount}</p>
                        </li>
                        <li className={"flex justify-between font-semibold text-2xl mt-2"}>
                            <h4>{order.data.payment?.status === "completed" ? "Amount paid" : "Amount to pay"}</h4>
                            <p>₹{order.data.totalAmount}</p>
                        </li>
                    </ul>
                    {!order?.data?.payment && (
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                        />
                    )}
                </div>
            </section>
        </main>
    );
}