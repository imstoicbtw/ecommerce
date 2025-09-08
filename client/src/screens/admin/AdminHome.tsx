import { useSelector } from "react-redux";
import { OrdersTable } from "../../components/Admin/OrdersTable.tsx";
import { Button } from "../../components/Button.tsx";
import { Loader } from "../../components/Loader.tsx";
import { useGetOrdersByStatusQuery } from "../../redux/query/ordersApiSlice.ts";
import { useGetAdminStatsQuery } from "../../redux/query/usersApiSlice.ts";
import type { Store } from "../../redux/store.ts";


export default function AdminHome () {
    const user = useSelector((state: Store) => state.user.details);
    const { data: stats, isLoading: loadingStats } = useGetAdminStatsQuery(null);
    const { data: orders, isLoading: loadingOrders } = useGetOrdersByStatusQuery({ status: "processing" });

    if (loadingStats || loadingOrders) return <Loader />;
    return (
        <main>
            <section>
                <p className={"text-lg font-medium"}>Welcome back!</p>
                <p className={"text-4xl font-bold"}>{user?.name.firstName} {user?.name.lastName}</p>
            </section>
            <section className={"mt-5"}>
                <ul className={"grid grid-cols-4 gap-3 text-white *:bg-blue-500 *:border-2 *:border-blue-600 *:rounded-2xl *:p-5"}>
                    {(Object.entries(stats?.data) as [ string, number ][]).map(([ key, value ]) => (
                        <li key={key}>
                            <div className={"text-lg font-semibold"}>{key}</div>
                            <div className={"text-3xl font-bold mt-2"}>{value}</div>
                        </li>
                    ))}
                </ul>
            </section>
            <section className={"mt-6"}>
                <h2 className={"text-2xl font-bold"}>Recent orders waiting to be shipped.</h2>
                <OrdersTable receivedOrders={orders.data} />
                <Button className={"mt-6 m-auto w-max"} to={"/dashboard/orders/pending/"}>View All &rarr;</Button>
            </section>
        </main>
    );
}