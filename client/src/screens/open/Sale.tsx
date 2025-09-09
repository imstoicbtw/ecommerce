import { HomeIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Loader } from "../../components/Loader.tsx";
import ProductCard from "../../components/ProductCard/index.tsx";
import type { IProductRawDoc } from "../../../../common/dist/mongoose/product.types";
import type { IMediaRawDoc } from "../../../../common/dist/mongoose/media.types";
import { useGetProductsOnSaleQuery } from "../../redux/query/productsApiSlice.ts";


type Product = IProductRawDoc & {
    _id: string;
    category: { name: string, slug: string };
    thumbnail: IMediaRawDoc & { _id: string };
    gallery: Array<IMediaRawDoc & { _id: string }>;
}

export function Sale () {

    const { data: fetchedProducts, isLoading: loadingProducts, error: productsError } = useGetProductsOnSaleQuery({});

    if (loadingProducts) return <Loader message={"Loading some amazing products..."} />;
    if (productsError) return <main className={"text-center mt-10"}>
        {
            "data" in productsError
            && productsError.data
            && "message" in (productsError.data as { message: string })
                ? (productsError.data as { message: string }).message
                : "Something went wrong..."
        }
    </main>;

    const products = fetchedProducts?.data?.filter((product: Product) => product.isActive);

    return (
        <main className={"my-12"}>
            <section className={"inner"}>
                <div className={"bg-green-50 h-60 rounded-2xl md:rounded-3xl flex justify-center items-center flex-col gap-2"}>
                    <h2 className={"font-semibold text-green-600"}>Products On Sale</h2>
                    <h1 className={"text-2xl md:text-4xl font-bold"}>Shop & Save</h1>
                    <div className={"flex items-center gap-1"}>
                        <Link to={"/"} className={"text-blue-500 hover:text-blue-600 block hover:bg-blue-100 p-1 rounded-full -mt-0.5"}><HomeIcon className={"size-5"} /></Link>
                        <ChevronRightIcon className={"size-4"} />
                        <span>Sale</span>
                    </div>
                </div>
            </section>
            <section className={"inner mt-12"}>
                <ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5"}>
                    {products?.map((product: Product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </ul>
            </section>
        </main>
    );
}