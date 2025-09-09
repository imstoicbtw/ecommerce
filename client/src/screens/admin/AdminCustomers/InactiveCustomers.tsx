import { CustomersTable } from "../../../components/Admin/CustomersTable.tsx";


export function InactiveCustomers () {
    return (
        <main className={"overflow-hidden"}>
            <h2 className={"text-xl font-bold mb-4"}>Inactive Customers</h2>
            <CustomersTable filterKey={"status"} filterValue={false} />
        </main>
    );
}