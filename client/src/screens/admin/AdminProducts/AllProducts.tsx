import { ProductsTable } from "../../../components/Admin/ProductsTable.tsx";


export function AllProducts () {
    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>All Products</h2>
            <ProductsTable />
        </main>
    );
}