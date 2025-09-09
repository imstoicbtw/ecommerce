import type { ComponentProps } from "react";
import { Button } from "./Button.tsx";
import { useNavigate } from "react-router-dom";


type Props = {
    baseUrl: string;
    meta: {
        page: number,
        size: number,
        pageCount: number,
    };
    keyword?: string,
    pageSize?: number;
    setPageSize: React.Dispatch<React.SetStateAction<number | undefined>>;
} & ComponentProps<"section">;

export default function Pagination ({ baseUrl, meta, setPageSize, keyword }: Props) {
    const navigate = useNavigate();
    return (
        <section className={"flex justify-between items-center"}>
            <div className={"flex gap-3 justify-center items-center"}>
                <Button
                    to={`${baseUrl}/?page=${meta.page - 1 || 1}&size=${meta.size}${keyword ? `&keyword=${keyword}` : ""}`}
                    className={"bg-blue-500 size-7 rounded-md text-white"}
                    hidden={meta.page === 1}
                >&larr;</Button>
                <p className={"text-sm leading-tight text-center"}>Page {meta.page} of {meta.pageCount}</p>
                <Button
                    to={`${baseUrl}/?page=${meta.page + 1 || 1}&size=${meta.size}${keyword ? `&keyword=${keyword}` : ""}`}
                    className={"bg-blue-500 size-7 rounded-md text-white"}
                    hidden={meta.page === meta.pageCount}
                >&rarr;</Button>
            </div>
            <div className={"flex gap-3 justify-center items-center"}>
                <label htmlFor={"pageSize"} className={"text-sm sm:text-base text-right leading-tight"}>Items per page:</label>
                <select
                    name={"pageSize"}
                    id={"pageSize"}
                    value={meta.size}
                    onChange={(event) => {
                        const newSize = +event.currentTarget.value;
                        navigate(`${baseUrl}/?page=1&size=${newSize}&${keyword ? `keyword=${keyword}` : ""}`);
                        setPageSize(newSize);
                    }}
                    className={"border-2 border-slate-300 text-slate-600 hover:border-blue-500 focus:border-blue-500 hover:text-blue-500 focus:text-blue-600 focus:bg-blue-50 rounded-lg px-2 py-1 outline-none"}
                >
                    <option value={8}>8</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </section>
    );
}