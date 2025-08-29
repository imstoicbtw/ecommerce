import { CategoriesTable } from "../../../components/Admin/CategoriesTable.tsx";


export function AllCategories () {
    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>All Categories</h2>
            <CategoriesTable />
        </main>
    );
}