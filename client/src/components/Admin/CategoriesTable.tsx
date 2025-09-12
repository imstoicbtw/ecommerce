import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline/index";
import type { ICategoryRawDoc } from "common/dist/mongoose/category.types.ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/query/categoriesApiSlice.ts";


type PropsOptional = {
    filterKey?: never
    filterValue?: never;
}
type PropsRequired = {
    filterKey: keyof ICategoryRawDoc;
    filterValue: any;
};

type Props = PropsOptional | PropsRequired;

type Category = {
    _id: string;
    count: number;
    name: string;
    slug: string;
};

export function CategoriesTable ({ filterKey, filterValue }: Props) {

    const { data: fetchedCategoriesData, isLoading: fetchingCategoriesData, error } = useGetCategoriesQuery(null, {
        refetchOnMountOrArgChange: true,
    });
    const [ categories, setCategories ] = useState<Array<Category>>([]);

    useEffect(() => {
        setCategories(fetchedCategoriesData?.data || []);
    }, [ fetchedCategoriesData ]);


    if (error) return <p className={"italic text-red-500"}>Error: {"message" in error ? error.message : "Something went wrong please try reloading the page..."}</p>;

    else if (fetchedCategoriesData && !fetchedCategoriesData.success) return <p className={"italic text-red-500"}>Error: {fetchedCategoriesData?.message || "Something went wrong please try reloading the page..."}</p>;

    else if (fetchingCategoriesData) return <div>Loading...</div>;

    else if (categories && !categories.length) return <main>No categories found.</main>;

    return (
        <div className={"overflow-x-auto"}>
            <table className={"w-full border-separate border-spacing-3 text-left **:whitespace-nowrap"}>
                <thead>
                <tr className={"*:bg-blue-100 *:text-slate-700 *:p-2 rounded-lg"}>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Products</th>
                </tr>
                </thead>
                <tbody className={"*:odd:bg-blue-50"}>
                {categories
                    .filter(category => !filterKey ? true : category[filterKey] === filterValue)
                    .map((category) => {
                            return (
                                <tr key={category._id} className={`*:text-slate-700 leading-tight *:p-2`}>
                                    <td className={"font-semibold"}>{category.name}</td>
                                    <td>
                                        <Link target={"_blank"} to={`/product-category/${category.slug}`} className={"link"}>
                                            <span>{category.slug}</span>
                                            <ArrowTopRightOnSquareIcon className={"w-3 h-3 inline-block ml-1"} />
                                        </Link>
                                    </td>
                                    <td>{category.count}</td>
                                </tr>
                            );
                        },
                    )
                }
                </tbody>
            </table>
        </div>
    );
}