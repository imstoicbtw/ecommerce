import { CustomersTable } from "../../../components/Admin/CustomersTable.tsx";


export function AllCustomers () {
    return (
        <main className={"overflow-hidden"}>
            <h2 className={"text-xl font-bold mb-4"}>All Customers</h2>
            <CustomersTable />
        </main>
    );
}