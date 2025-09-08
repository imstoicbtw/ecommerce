import type { IPaymentRawDoc } from "common/dist/mongoose/payment.types.ts";
import type { INameRawDoc } from "common/dist/mongoose/user.types.ts";
import { useEffect, useState } from "react";
import { PaymentsTable } from "../../../components/Admin/PaymentsTable.tsx";
import { Loader } from "../../../components/Loader.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { useGetAllPaymentsQuery } from "../../../redux/query/paymentApiSlice.ts";
import { getRequestMeta } from "../../../utils/get-request-meta.util.ts";
import { useLocation } from "react-router-dom";


type Payment = Omit<IPaymentRawDoc, "user"> & { _id: string, user: { name: INameRawDoc, email: string } };

export function AllPayments () {

    const { search } = useLocation();
    const params = getRequestMeta(search);
    const [ pageSize, setPageSize ] = useState<number | undefined>(params.size);
    const { data: payments, isLoading: paymentsLoading, error: paymentsError, refetch: refechPayments } = useGetAllPaymentsQuery({ ...params, size: pageSize }, { refetchOnMountOrArgChange: true });


    useEffect(() => {
        refechPayments();
    }, [ pageSize ]);

    if (paymentsLoading || !payments) return <Loader message={"Loading orders, please wait a moment..."} />;
    if (paymentsError) return <div className={"text-red-500 italic"}>Error: Something went wrong, please try reloading the page.</div>;

    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>All Payments</h2>
            {!payments?.data?.length
                ? <p>No payments found.</p>
                : <>
                    <PaymentsTable receivedPayments={payments.data as Payment[]} />
                    <Pagination meta={payments.meta} baseUrl={"/dashboard/payments"} pageSize={pageSize} setPageSize={setPageSize} />
                </>
            }
        </main>
    );
}