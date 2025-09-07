import { useEffect, useState } from "react";
import { ProductsTable } from "../../../components/Admin/ProductsTable.tsx";
import type { IProductRawDoc } from "../../../../../common/dist/mongoose/product.types.js";
import type { ICategoryRawDoc } from "../../../../../common/dist/mongoose/category.types.js";
import type { IMediaRawDoc } from "../../../../../common/dist/mongoose/media.types.js";
import { Loader } from "../../../components/Loader.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { useGetInactiveProductsQuery } from "../../../redux/query/productsApiSlice.ts";
import { getRequestMeta } from "../../../utils/get-request-meta.util.ts";
import { useLocation } from "react-router-dom";


type Product = Omit<IProductRawDoc, "category" | "thumbnail"> & { _id: string, category: ICategoryRawDoc, thumbnail: IMediaRawDoc };

export function InactiveProducts () {

    const { search } = useLocation();
    const params = getRequestMeta(search);
    const [ pageSize, setPageSize ] = useState<number | undefined>(params.size);
    const { currentData: products, isLoading: loadingProducts, error: productsError, refetch: refetchProducts } = useGetInactiveProductsQuery({ ...params, size: pageSize }, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetchProducts();
    }, [ pageSize ]);

    if (loadingProducts || !products) return <Loader message={"Loading products..."} />;
    if (productsError) return <main className={"text-red-500 italic"}>Error: Something went wrong, please try reloading the page.</main>;
    if (products.data && !products.data.length) return <main>No inactive products found.</main>;

    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>Inactive Products</h2>
            <ProductsTable products={products.data as Product[]} />
            <Pagination meta={products.meta} baseUrl={"/dashboard/products/inactive"} pageSize={pageSize} setPageSize={setPageSize} />
        </main>
    );
}