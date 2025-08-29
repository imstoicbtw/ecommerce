import { ProductsTable } from "../../../components/Admin/ProductsTable.tsx";


export function OnSaleProducts () {
    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>Products On Sale</h2>
            <ProductsTable filterKey={"onSale"} filterValue={true} />
        </main>
    );
}