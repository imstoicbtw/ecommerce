import { PencilSquareIcon, TrashIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline/index";
import type { ICategoryRawDoc } from "common/dist/mongoose/category.types.ts";
import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import type { IProductRawDoc } from "common/dist/mongoose/product.types.ts";
import { useState } from "react";
import { toast } from "react-toastify/unstyled";
import { Button } from "../Button.tsx";
import { ToggleInput } from "../ToggleInput.tsx";
import { useDeleteProductMutation, useUpdateProductPropertyMutation } from "../../redux/query/productsApiSlice.ts";
import { useEffect } from "react";


type Props = {
    products: Array<Omit<IProductRawDoc, "category" | "thumbnail"> & { _id: string, category: ICategoryRawDoc, thumbnail: IMediaRawDoc }>;
}

export function ProductsTable ({ products: receivedProducts }: Props) {

    const [ deleteProduct, { isLoading: deletingProduct } ] = useDeleteProductMutation();
    const [ updateProductStatus, { isLoading: updatingProductStatus } ] = useUpdateProductPropertyMutation();


    const [ products, setProducts ] = useState<typeof receivedProducts>(receivedProducts);

    useEffect(() => {
        setProducts(receivedProducts);
    }, [ receivedProducts ]);

    const handleStatusToggle = async (productId: string, status: boolean) => {
        try {
            const result = await updateProductStatus({ key: "isActive", value: status, productId }).unwrap();
            if (!result.success) throw new Error(result.message);
            toast.success(status ? "Product activated successfully." : "Product deactivated successfully.");
            setProducts(prevProducts => {
                return prevProducts.filter(product => product._id !== productId);
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

    return (

        <table className={"w-full border-separate border-spacing-y-3 text-left"}>
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
            <tbody>
            {products.map((product) => (
                <tr key={product._id} className={`*:text-slate-700 leading-tight hover:shadow-lg hover:bg-blue-50`}>
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
                                variant={"destructive"}
                                icon={TrashIcon}
                                className={"grid w-8 h-8 !rounded-full grid pt-2"}
                                onClick={() => handleDeleteProduct(product._id)}
                                loading={deletingProduct}
                            />
                            <Button
                                variant={"success"}
                                icon={PencilSquareIcon}
                                className={"grid w-8 h-8 !rounded-full grid pt-2"}
                                to={`/dashboard/products/edit/${product._id}`}
                            />
                            <Button
                                icon={ArrowTopRightOnSquareIcon}
                                className={"grid w-8 h-8 !rounded-full grid pt-2"}
                                to={`/product/${product._id}`} target={"_blank"}
                            />
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}