import type { IOrderRawDoc } from "common/dist/mongoose/order.types.ts";
import { useEffect, useState } from "react";
import { OrdersTable } from "../../../components/Admin/OrdersTable.tsx";
import { Loader } from "../../../components/Loader.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { useGetAllOrdersQuery } from "../../../redux/query/ordersApiSlice.ts";
import { getRequestMeta } from "../../../utils/get-request-meta.util.ts";
import { useLocation } from "react-router-dom";


type Order = IOrderRawDoc & { _id: string };

export function AllOrders () {

    const { search } = useLocation();
    const params = getRequestMeta(search);
    const [ pageSize, setPageSize ] = useState<number | undefined>(params.size);
    const { data: orders, isLoading: loadingOrders, error: ordersError, refetch: refetchOrders } = useGetAllOrdersQuery({ ...params, size: pageSize }, { refetchOnMountOrArgChange: true });


    useEffect(() => {
        refetchOrders();
    }, [pageSize, refetchOrders]);

    if (loadingOrders || !orders) return <Loader message={"Loading orders, please wait a moment..."} />;
    if (ordersError) return <div className={"text-red-500 italic"}>Error: Something went wrong, please try reloading the page.</div>;

    return (
        <main className={"overflow-hidden"}>
            <h2 className={"text-xl font-bold mb-4"}>All Orders</h2>
            {!orders?.data?.length
                ? <p>No orders found.</p>
                : <>
                    <OrdersTable receivedOrders={orders.data as Order[]} />
                    <Pagination meta={orders.meta} baseUrl={"/dashboard/orders"} pageSize={pageSize} setPageSize={setPageSize} />
                </>
            }
        </main>
    );
}