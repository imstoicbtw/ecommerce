import { ProductsTable } from "../../../components/Admin/ProductsTable.tsx";


export function InactiveProducts () {
    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>All Products</h2>
            <ProductsTable filterKey={"isActive"} filterValue={false} />
        </main>
    );
}