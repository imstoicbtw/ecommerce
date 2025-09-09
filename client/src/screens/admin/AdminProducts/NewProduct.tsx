import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline/index";
import { XCircleIcon } from "@heroicons/react/24/solid/index";
import type { ICategoryRawDoc } from "common/dist/mongoose/category.types.ts";
import type { IMediaRawDoc } from "common/dist/mongoose/media.types.ts";
import { createProductReqBody, type createProductReqBodyType } from "common/dist/zod/requests/product.zod.js";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify/unstyled";
import { Button } from "../../../components/Button.tsx";
import { Input } from "../../../components/Input.tsx";
import MediaSelector from "../../../components/MediaSelector/index.tsx";
import { SelectInput } from "../../../components/SelectInput.tsx";
import { TextArea } from "../../../components/TextArea.tsx";
import { ToggleInput } from "../../../components/ToggleInput.tsx";
import { useGetCategoriesQuery } from "../../../redux/query/categoriesApiSlice.ts";
import { useGetGalleryQuery, useGetMediaByIdQuery } from "../../../redux/query/mediaApiSlice.ts";
import { useCreateProductMutation } from "../../../redux/query/productsApiSlice.ts";


export function NewProduct () {

    const { data: fetchedCategories } = useGetCategoriesQuery(null);
    const [ createProduct, { isLoading: loadingProductMutation } ] = useCreateProductMutation();

    const thumbnailButtonRef = useRef<HTMLDivElement>(null);
    const galleryButtonRef = useRef<HTMLButtonElement>(null);
    const [ thumbnail, setThumbnail ] = useState<string[]>([]);
    const [ gallery, setGallery ] = useState<string[]>([]);
    const [ formState, setFormState ] = useState<createProductReqBodyType>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        onSale: false,
        isActive: true,
        category: "",
        thumbnail: thumbnail[0],
        gallery: gallery,
    });


    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.currentTarget;
        setFormState({ ...formState, [name]: value });
    };

    const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.currentTarget;
        if (name === "onSale") setFormState(prev => ({ ...prev, salePrice: 0 }));
        setFormState(prev => ({ ...prev, [name]: checked }));
    };


    const { data: fetchedThumbnailData, refetch: refetchThumbnail } = useGetMediaByIdQuery(thumbnail[0], { skip: !thumbnail[0] });
    const [ fetchedThumbnail, setFetchedThumbnail ] = useState<IMediaRawDoc & { _id: string }>();
    useEffect(() => {
        if (!thumbnail.length) return;
        refetchThumbnail();
        setFormState({ ...formState, thumbnail: thumbnail[0] });
    }, [ thumbnail ]);
    useEffect(() => {
        setFetchedThumbnail(fetchedThumbnailData?.data);
    }, [ fetchedThumbnailData ]);


    const [ fetchedGallery, setFetchedGallery ] = useState<(IMediaRawDoc & { _id: string })[]>([]);
    const { data: fetchedGalleryData, refetch: refetchGallery } = useGetGalleryQuery(gallery, {
        skip: !gallery.length,
    });
    useEffect(() => {
        if (!gallery.length) return;
        refetchGallery();
        setFormState({ ...formState, gallery });
    }, [ gallery ]);
    useEffect(() => {
        setFetchedGallery(fetchedGalleryData?.data);
    }, [ fetchedGalleryData ]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const parsed = createProductReqBody.safeParse(formState);
        if (!parsed.success) {
            toast.error("Some fields are invalid, please try again.");
            return;
        }
        try {
            const response = await createProduct(parsed.data).unwrap();
            if (!response.success) throw new Error(response.message);
            toast.success(response.message);
        } catch (error: any) {
            toast.error(error?.message || error.data?.message || "An error occurred while creating the product.");
        }
    };


    return (
        <main>
            <h1 className={"font-bold text-xl"}>Add New Product</h1>
            <form className={"mt-10 flex flex-col gap-5"} onSubmit={handleSubmit}>
                <Input
                    name={"name"}
                    label={"Name"}
                    value={formState.name}
                    placeholder={"Product name"}
                    autoFocus
                    onChange={handleInputChange}
                />
                <TextArea
                    name={"description"}
                    label={"Description"}
                    value={formState.description}
                    placeholder={"Product Description"}
                    onChange={handleInputChange}
                />
                <div className={"flex gap-5 *:w-max"}>
                    <ToggleInput
                        name={"isActive"}
                        label={"Is active?"}
                        onChange={handleToggleChange}
                        checked={formState.isActive}
                        serious
                    />
                    <ToggleInput
                        name={"onSale"}
                        label={"On sale?"}
                        onChange={handleToggleChange}
                        checked={formState.onSale}
                    />
                </div>
                {
                    <div className={"grid grid-cols-3 gap-5"}>
                        <Input
                            name={"price"}
                            label={"Regular Price"}
                            type={"number"}
                            value={formState.price}
                            placeholder={"Regular Price"}
                            onChange={handleInputChange}
                            description={"(₹) Enter a regular price for this product when it's not on the sale."}
                        />
                        {formState.onSale && (
                            <Input
                                name={"salePrice"}
                                label={"Sale Price"}
                                type={"number"}
                                value={formState.salePrice}
                                placeholder={"Sale Price"}
                                onChange={handleInputChange}
                                disabled={!formState.onSale}
                                description={"(₹) This price will be applicable for checkout when 'On Sale' is checked. Should be less than the regular price."}
                            />
                        )}
                        <Input
                            name={"stock"}
                            label={"Stock"}
                            type={"number"}
                            value={formState.stock}
                            placeholder={"Product Stock"}
                            onChange={handleInputChange}
                            description={"If not set, defaults to 0 which means customers will not be able to purchase this product until it's added to the stock."}
                        />
                    </div>
                }
                <SelectInput
                    name={"category"}
                    label={"Select Category"}
                    onChange={handleInputChange}
                >
                    <option value="">Select Category</option>
                    {
                        fetchedCategories?.data.map((category: ICategoryRawDoc & { _id: string }) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        )) ?? "Loading..."
                    }
                </SelectInput>

                <div className={"grid grid-cols-4 gap-6"}>
                    <div className={"flex flex-col col-span-4 sm:col-span-3 md:col-span-1"}>
                        <h2 className={"font-semibold text-lg mb-2"}>Thumbnail</h2>
                        <div
                            ref={thumbnailButtonRef}
                            className={`grid place-items-center aspect-square rounded-2xl overflow-hidden cursor-pointer ${!fetchedThumbnail?._id ? "border-2 border-dashed border-slate-300 hover:border-blue-500 hover:text-blue-600" : "bg-cover bg-center"}`}
                        >
                            {!fetchedThumbnail?._id ? (
                                <div className={"flex flex-col gap-2 items-center"}>
                                    <PhotoIcon className={"w-12 h-12"} />
                                    <span>Select Thumbnail</span>
                                </div>
                            ) : (
                                <img
                                    src={fetchedThumbnail?.url}
                                    alt={fetchedThumbnail?.name}
                                    className={"w-full h-full object-cover"}
                                />
                            )}

                        </div>
                    </div>
                    <div className={"col-span-4 md:col-span-3 flex flex-col"}>
                        <div className={"flex justify-between items-center mb-2"}>
                            <h2 className={"font-semibold text-lg"}>Gallery</h2>
                            <Button type={"button"} size={"small"} icon={PlusIcon} ref={galleryButtonRef}>Add Images</Button>
                        </div>
                        <div className={"grow rounded-2xl"}>
                            {!fetchedGallery?.length ? (
                                <div className={"flex flex-col gap-2 items-center p-5"}>
                                    <PhotoIcon className={"w-12 h-12"} />
                                    <span>No images selected</span>
                                </div>) : (
                                <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"}>
                                    {
                                        fetchedGallery.map((image) => (
                                            <div
                                                className={"relative rounded-xl overflow-hidden"}
                                                key={image._id}
                                            >
                                                <Button
                                                    type={"button"}
                                                    size={"large"}
                                                    icon={XCircleIcon}
                                                    variant={"ghost"}
                                                    className={"absolute top-1 right-0 !p-0 !text-red-500 hover:bg-transparent"}
                                                    onClick={() => {
                                                        setGallery(gallery.filter(id => id !== image._id));
                                                    }}
                                                />
                                                <img key={image._id} src={image.url} alt={image.name} className={"object-cover w-full h-full aspect-square"} />
                                            </div>
                                        ))
                                    }
                                </div>)}
                        </div>
                    </div>
                </div>
                <Button type={"submit"} loading={loadingProductMutation}>Create Product</Button>
            </form>
            <MediaSelector trigger={thumbnailButtonRef} setMediaState={setThumbnail} mediaState={thumbnail} limit={1} />
            <MediaSelector trigger={galleryButtonRef} setMediaState={setGallery} mediaState={gallery} />
        </main>
    );
}