import { ProductsTable } from "../../../components/Admin/ProductsTable.tsx";
import { Loader } from "../../../components/Loader.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { useGetProductsQuery } from "../../../redux/query/productsApiSlice.ts";
import type { IProductRawDoc } from "../../../../../common/dist/mongoose/product.types.js";
import type { ICategoryRawDoc } from "../../../../../common/dist/mongoose/category.types.js";
import type { IMediaRawDoc } from "../../../../../common/dist/mongoose/media.types.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRequestMeta } from "../../../utils/get-request-meta.util.ts";


type Product = Omit<IProductRawDoc, "category" | "thumbnail"> & { _id: string, category: ICategoryRawDoc, thumbnail: IMediaRawDoc };

export function AllProducts () {

    const { search } = useLocation();
    const params = getRequestMeta(search);
    const [ pageSize, setPageSize ] = useState<number | undefined>(params.size);
    const { data: products, isLoading: loadingProducts, error: productsError, refetch: refetchProducts } = useGetProductsQuery({ ...params, size: pageSize }, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetchProducts();
    }, [ pageSize ]);

    if (loadingProducts || !products) return <Loader message={"Loading products..."} />;
    if (productsError) return <div className={"text-red-500 italic"}>Error: Something went wrong, please try reloading the page.</div>;

    return (
        <main>
            <h2 className={"text-xl font-bold mb-4"}>All Products</h2>
            <ProductsTable products={products.data as Product[]} />
            <Pagination meta={products.meta} baseUrl={"/dashboard/products"} pageSize={pageSize} setPageSize={setPageSize} />
        </main>
    );
}