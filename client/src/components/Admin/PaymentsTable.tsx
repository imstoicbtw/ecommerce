import { ArrowTopRightOnSquareIcon, EnvelopeIcon } from "@heroicons/react/16/solid/index";
import type { IPaymentRawDoc } from "common/dist/mongoose/payment.types.js";
import type { INameRawDoc } from "common/dist/mongoose/user.types.ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


type Props = {
    receivedPayments: Array<Omit<IPaymentRawDoc, "user"> & { _id: string, user: { name: INameRawDoc, email: string } }>;
}

export function PaymentsTable ({ receivedPayments }: Props) {

    const [ payments, setPayments ] = useState<typeof receivedPayments>(receivedPayments);

    useEffect(() => {
        setPayments(receivedPayments);
    }, [ receivedPayments ]);

    return (
        <div className={"overflow-x-auto"}>
            <table className={"w-full border-separate border-spacing-3 text-left **:whitespace-nowrap"}>
                <thead>
                <tr className={"*:bg-blue-100 *:text-slate-700 *:p-2 rounded-lg"}>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Transaction Id</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment._id} className={`*:text-slate-700 leading-tight`}>
                        <td>
                            <p className={"text-lg font-semibold"}>
                                {payment.user.name.firstName} {payment.user.name.lastName}
                            </p>
                            <p className={"text-sm flex flex-col justify-center"}>
                                <a
                                    href={`mailto:${payment.user.email}`}
                                    className={"flex items-center gap-1 link"}
                                >
                                    <EnvelopeIcon className={"size-3"} />
                                    <span>{payment.user.email}</span>
                                </a>
                                <span className={"flex items-center gap-1"}>
                                <span>Order ID:</span>
                            <Link to={`/dashboard/orders/order/${payment.order}`} className={"link flex items-center gap-1"}>
                                <span>{payment.order.toString()}</span>
                                <ArrowTopRightOnSquareIcon className={"size-3"} />
                            </Link>
                            </span>
                            </p>
                        </td>
                        <td>
                            <span className={`px-2 py-0.5 rounded-full uppercase text-sm font-semibold border-2 ${payment.status === "pending" ? "bg-yellow-100 text-yellow-600" : payment.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"}`}>{payment.status}</span>
                        </td>
                        <td>
                            {payment.transactionId}
                        </td>
                        <td className={"text-right text-lg font-semibold"}>
                            ₹{payment.amount}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}