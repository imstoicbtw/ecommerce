import { HomeIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader.tsx";
import ProductCard from "../../components/ProductCard/index.tsx";
import { useGetCategoryBySlugQuery, useGetCategoryProductsBySlugQuery } from "../../redux/query/categoriesApiSlice.ts";
import type { IProductRawDoc } from "../../../../common/dist/mongoose/product.types";
import type { IMediaRawDoc } from "../../../../common/dist/mongoose/media.types";


type Product = IProductRawDoc & {
    _id: string;
    category: { name: string, slug: string };
    thumbnail: IMediaRawDoc & { _id: string };
    gallery: Array<IMediaRawDoc & { _id: string }>;
}

export function CategoryArchives () {

    const { categorySlug } = useParams();
    const { currentData: fetchedCategory, isLoading: loadingCategory, error: categoryError } = useGetCategoryBySlugQuery(categorySlug || "", {
        skip: !categorySlug,
    });
    const { currentData: fetchedProducts, isLoading: loadingProducts, error: productsError } = useGetCategoryProductsBySlugQuery(categorySlug || "", {
        skip: !categorySlug,
        refetchOnMountOrArgChange: true,
    });


    if (loadingCategory) return <Loader message={"Loading category..."} />;
    if (categoryError) return <main className={"text-center mt-10 font-semibold text-lg"}>
        {
            "data" in categoryError
            && categoryError.data
            && "message" in (categoryError.data as { message: string })
                ? (categoryError.data as { message: string }).message
                : "Something went wrong..."
        }
    </main>;


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
    const category = fetchedCategory?.data;

    return (
        <main className={"my-12"}>
            <section className={"inner"}>
                <div className={"bg-blue-50 h-60 rounded-3xl flex justify-center items-center flex-col gap-2"}>
                    <h2 className={"font-semibold"}>Category Archives</h2>
                    <h1 className={"text-4xl font-bold"}>{category?.name}</h1>
                    <div className={"flex items-center gap-1"}>
                        <Link to={"/"} className={"text-blue-500 hover:text-blue-600 block hover:bg-blue-100 p-1 rounded-full -mt-0.5"}><HomeIcon className={"size-5"} /></Link>
                        <ChevronRightIcon className={"size-4"} />
                        <span>{category?.name}</span>
                    </div>
                </div>
            </section>
            <section className={"inner mt-12"}>
                <ul className={"grid grid-cols-4 gap-5"}>
                    {!products?.length
                        ? <p className={"text-center text-slate-500 col-span-4"}>{category?.name} doesn't have any products.</p>
                        : products.map((product: Product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                </ul>
            </section>
        </main>
    );
}