import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid/index";
import { PercentBadgeIcon } from "@heroicons/react/24/solid/index";
import type { IProductRawDoc } from "common/dist/mongoose/product.types.ts";
import { Button } from "../../components/Button.tsx";
import ProductCard from "../../components/ProductCard/index.tsx";
import { useGetProductsOnSaleQuery, useGetProductsQuery } from "../../redux/query/productsApiSlice.ts";
import { useSelector } from "react-redux";
import type store from "../../redux/store.ts";


type Product = Omit<IProductRawDoc, "category" | "thumbnail" | "gallery"> & {
    _id: string;
    category: { name: string, slug: string };
    thumbnail: { url: string };

}

export function Home () {
    const { data: fetchedAllProducts, isLoading: loadingAllProducts, error: allProductsError } = useGetProductsQuery({}, { refetchOnMountOrArgChange: true });
    const { data: fetchedOnSaleProducts, isLoading: loadingOnSaleProducts, error: onSaleProductsError } = useGetProductsOnSaleQuery({}, { refetchOnMountOrArgChange: true });
    const recentlyViewedProducts = useSelector((state: ReturnType<typeof store.getState>) => state.recentlyViewed);

    return (
        <main>
            <section className={"inner mt-3"}>
                <div className={"text-white shadow-2xl min-h-64 bg-[url(stars.gif)] bg-black rounded-3xl flex flex-col justify-center items-center py-20"}>
                    <h2 className={"text-6xl md:text-8xl leading-none font-black opacity-90 blur-xs tracking-widest text-blue-200 uppercase text-center"}>
                        Happy Diwali
                    </h2>
                    <h3 className={"text-3xl md:text-4xl font-bold mt-5"}>Sale is now live!</h3>
                    <Button to={"/sale"} size={"large"} icon={PercentBadgeIcon} variant={"success"} className={"mt-4"}>Shop Now &rarr;</Button>
                </div>
            </section>
            <section className={"inner mt-20 lg:mt-30"}>
                <h3 className={"text-xl sm:text-3xl sm:gap-2 font-bold mb-10 uppercase tracking-normal lg:tracking-widest text-green-600 text-center flex flex-col items-center gap-1 w-max mx-auto"}>
                    <span>Products On Sale</span>
                    <span className={"w-1/2 h-0.5 bg-green-600"}></span>
                </h3>
                {
                    loadingOnSaleProducts
                        ? <p>Loading...</p>
                        : onSaleProductsError ? <p className={"text-red-500 italic"}>{"message" in onSaleProductsError ? onSaleProductsError.message : "Something went wrong."}</p>
                            : !fetchedOnSaleProducts.data.length ? <p>No products found.</p>
                                : (<ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5"}>
                                    {fetchedOnSaleProducts.data
                                                          .filter((product: IProductRawDoc) => product.isActive)
                                                          .map((product: Product) => <ProductCard product={product} key={"on_sale_" + product._id} />)}
                                </ul>)
                }
            </section>
            <section className={"inner mt-20 lg:mt-30"}>
                <h3 className={"text-xl sm:text-3xl sm:gap-2 font-bold mb-10 uppercase tracking-normal lg:tracking-widest text-blue-600 text-center flex flex-col items-center gap-1 w-max mx-auto"}>
                    <span>Recommended Products</span>
                    <span className={"w-1/2 h-0.5 bg-blue-600"}></span>
                </h3>
                {
                    loadingAllProducts
                        ? <p>Loading...</p>
                        : allProductsError ? <p className={"text-red-500 italic"}>{"message" in allProductsError ? allProductsError.message : "Something went wrong."}</p>
                            : !fetchedAllProducts.data.length ? <p>No products found.</p>
                                : (<ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5"}>
                                    {fetchedAllProducts.data
                                                       .filter((product: IProductRawDoc) => product.isActive)
                                                       .map((product: Product) => <ProductCard product={product} key={"recommended_" + product._id} />)}
                                </ul>)
                }
            </section>
            <section className={"inner mt-20 lg:mt-30"}>
                <h3 className={"text-lg sm:text-2xl sm:gap-2 font-bold mb-10 uppercase tracking-normal lg:tracking-widest text-slate-700 text-center flex flex-col items-center gap-1 w-max mx-auto"}>
                    <span>Recently Viewed Products</span>
                    <span className={"w-1/2 h-px bg-slate-700"}></span>
                </h3>
                {!recentlyViewedProducts.length
                    ? <div className={"max-w-max flex flex-col items-center gap-2 m-auto"}>
                        <p>You haven't browsed any products.</p>
                        <Button to={"/sale"}>Browse products &rarr;</Button>
                    </div>
                    : <ul className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5"}>
                        {recentlyViewedProducts
                            .filter(product => product.isActive)
                            .map(product => <ProductCard product={product as unknown as Product} key={"recently_viewed_" + product._id} />)}
                    </ul>
                }
            </section>
            <section className={"inner my-20 lg:my-30"}>
                <div className={"bg-blue-50 border-2 border-blue-100 p-10 rounded-3xl shadow-2xl flex flex-col sm:flex-row gap-5 items-center justify-between text-center sm:text-left"}>
                    <div className={"sm:basis-2/3"}>
                        <h3 className={"text-3xl font-bold text-blue-600 mb-2"}>Need help?</h3>
                        <p>If you have any questions, please feel free to contact us. Our team is working 24x7 to solve your queries and help you choose best products.</p>
                    </div>
                    <Button to={"/contact"} icon={ChatBubbleBottomCenterTextIcon}>Contact Us &rarr;</Button>
                </div>
            </section>
        </main>
    );
}