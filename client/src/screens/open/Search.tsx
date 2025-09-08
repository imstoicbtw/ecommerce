import type { IProductRawDoc } from "common/dist/mongoose/product.types.ts";
import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader.tsx";
import Pagination from "../../components/Pagination.tsx";
import ProductCard from "../../components/ProductCard/index.tsx";
import { useGetProductsQuery } from "../../redux/query/productsApiSlice.ts";
import { getRequestMeta } from "../../utils/get-request-meta.util.ts";
import { useLocation } from "react-router-dom";


type Product = Omit<IProductRawDoc, "category" | "thumbnail" | "gallery"> & {
    _id: string;
    category: { name: string, slug: string };
    thumbnail: { url: string };

}

export function Search () {

    const { search } = useLocation();
    const params = getRequestMeta(search);
    const [ pageSize, setPageSize ] = useState<number | undefined>(params.size);
    const { data: products, isLoading: loadingProducts, error: productsError, refetch: refetchProducts } = useGetProductsQuery({ ...params, size: pageSize }, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        refetchProducts();
    }, [ pageSize ]);

    if (loadingProducts || !products) return <Loader message={"Loading products..."} />;
    if (productsError) return <main className={"text-red-500 italic"}>Error: Something went wrong, please try reloading the page.</main>;
    return (
        <main>
            <section className={"inner mt-10"}>
                <h1 className={"text-2xl font-semibold"}>Search for "{params.keyword}"</h1>
                <Pagination baseUrl={"/search"} meta={products.meta} keyword={params.keyword} setPageSize={setPageSize} />
            </section>
            <section className={"inner my-10"}>
                {!products.data.length && <p>No products found.</p>}
                <ul className={"grid grid-cols-4 gap-5"}>
                    {
                        products.data.map((product: Product) => (
                            <ProductCard product={product} key={"search_result_" + product._id} />
                        ))
                    }
                </ul>
            </section>
        </main>
    );
}