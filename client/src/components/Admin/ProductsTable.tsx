import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline/index";
import type { ICategoryRawDoc } from "common/dist/mongoose/category.types.ts";
import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import type { IProductRawDoc } from "common/dist/mongoose/product.types.ts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify/unstyled";
import { Button } from "../Button.tsx";
import { ToggleInput } from "../ToggleInput.tsx";
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductPropertyMutation } from "../../redux/query/productsApiSlice.ts";


type PropsOptional = {
    filterKey?: never
    filterValue?: never;
}
type PropsRequired = {
    filterKey: keyof IProductRawDoc;
    filterValue: any;
};

type Props = PropsOptional | PropsRequired;

export function ProductsTable ({ filterKey, filterValue }: Props) {

    const location = useLocation();
    const [ deleteProduct, { isLoading: deletingProduct } ] = useDeleteProductMutation();
    const [ updateProductStatus, { isLoading: updatingProductStatus } ] = useUpdateProductPropertyMutation();
    const { currentData: fetchedProductsData, isLoading, error, refetch: refetchProducts } = useGetProductsQuery(null);

    const [ products, setProducts ] = useState<Array<IProductRawDoc & { _id: string, category: ICategoryRawDoc, thumbnail: IMediaRawDoc }>>([]);
    const [ productsLength, setProductsLength ] = useState<number>(0);

    const handleStatusToggle = async (productId: string, status: boolean) => {
        try {
            const result = await updateProductStatus({ key: "isActive", value: status, productId }).unwrap();
            if (!result.success) throw new Error(result.message);
            toast.success(status ? "Product activated successfully." : "Product deactivated successfully.");
            setProducts(prevProducts => {
                return prevProducts.map(product => (product._id === productId ? { ...product, isActive: status } : product));
            });
        } catch (error: any) {
            toast.error(error?.message || error.data?.message || "An error occurred while updating the product status.");
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const result = await deleteProduct(productId).unwrap();
            if (!result.success) throw new Error(result.message);
            toast.success(result.message);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error: any) {
            toast.error(error?.message || error.data?.message || "An error occurred while deleting the product.");
        }
    };

    useEffect(() => {
        setProducts(fetchedProductsData?.data || []);
    }, [ fetchedProductsData ]);

    useEffect(() => {
        setProductsLength(products.filter((product: IProductRawDoc) => !filterKey ? true : product[filterKey] === filterValue).length || 0);
    }, [ products ]);

    useEffect(() => {
        refetchProducts();
    }, [ location ]);


    if (error) return <p className={"italic text-red-500"}>Error: {"message" in error ? error.message : "Something went wrong please try reloading the page..."}</p>;

    else if (fetchedProductsData && !fetchedProductsData.success) return <p className={"italic text-red-500"}>Error: {fetchedProductsData?.message || "Something went wrong please try reloading the page..."}</p>;

    else if (!productsLength) return <div>Nothing found.</div>;

    else if (isLoading) return <div>Loading...</div>;

    else if (!fetchedProductsData.data) return <p>No products found.</p>;

    else
        return (

            <table className={"w-full border-separate border-spacing-y-2 text-left"}>
                <thead>
                <tr className={"*:bg-blue-100 *:text-slate-700 *:p-2 rounded-lg"}>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th className={"text-center"}>Price
                    </th>
                    <th className={"text-center"}>Category</th>
                    <th className={"text-center"}>Status</th>
                    <th className={"text-center"}>Action</th>
                </tr>
                </thead>
                <tbody className={"*:odd:bg-blue-50"}>
                {products
                    .filter((product: IProductRawDoc) => !filterKey ? true : product[filterKey] === filterValue)
                    .map((product) => (
                        <tr key={product._id} className={`*:text-slate-700 leading-tight`}>
                            <td className={"max-w-max p-0"}>
                                <img src={product.thumbnail.url} alt={product.name} className={"w-full aspect-square h-16 object-cover"} />
                            </td>
                            <td className={"p-2 "}>{product.name}</td>
                            <td className={"p-2 max-w-xs"}>{product.description.slice(0, 50)}...</td>
                            <td className={"p-2 text-right"}>{product.price}</td>
                            <td className={"p-2 text-center"}>{product.category.name}</td>
                            <td className={"p-2 *:m-auto"}>
                                <ToggleInput
                                    name={product._id}
                                    checked={product.isActive}
                                    serious
                                    disabled={updatingProductStatus}
                                    onChange={() => handleStatusToggle(product._id, !product.isActive)}
                                />
                            </td>
                            <td className={"p-2"}>
                                <div className={"w-full flex gap-1 justify-center"}>
                                    <Button
                                        icon={PencilSquareIcon}
                                        className={"grid w-8 h-8 !rounded-full grid pt-2"}
                                        to={`/dashboard/products/edit/${product._id}`}
                                    />
                                    <Button
                                        variant={"destructive"}
                                        icon={TrashIcon}
                                        className={"grid w-8 h-8 !rounded-full grid pt-2"}
                                        onClick={() => handleDeleteProduct(product._id)}
                                        loading={deletingProduct}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
}