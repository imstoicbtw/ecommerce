import { CategoriesTable } from "../../../components/Admin/CategoriesTable.tsx";


export function AllCategories () {
    return (
        <main className={"overflow-hidden"}>
            <h2 className={"text-xl font-bold mb-4"}>All Categories</h2>
            <CategoriesTable />
        </main>
    );
}