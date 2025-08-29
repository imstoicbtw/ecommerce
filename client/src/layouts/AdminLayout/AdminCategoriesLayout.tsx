import { PlusIcon } from "@heroicons/react/24/outline/index";
import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { createCategoryReqBody, type createCategoryReqBodyType } from "../../../../common/dist/zod/requests/category.zod.js";
import AdminHeader, { type AdminHeaderContent } from "../../components/Admin/AdminHeader/";
import Dialog from "../../components/Dialog/index.tsx";
import { Input } from "../../components/Input.tsx";

import * as React from "react";
import { formatZodErrors } from "../../../../common/dist/utils/format-zod-errors.js";
import { useCreateCategoryMutation } from "../../redux/query/categoriesApiSlice.ts";
import { setIn } from "../../utils/object-mutation.util";


export default function AdminCategoriesLayout () {

    const actionButtonRef = useRef<HTMLButtonElement | null>(null);
    const [ createCategory ] = useCreateCategoryMutation();

    const content: AdminHeaderContent = {
        action: {
            label: "New Category",
            icon: PlusIcon,
            trigger: actionButtonRef,
        },
        navigation: [],
    };


    // NEW Category Form

    const [ formState, setFormState ] = useState<Partial<createCategoryReqBodyType>>({name: "", slug: ""});
    const [ , setErrors ] = useState<Record<string, string>>({});

    const handleSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formState.slug?.length) return;
        const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        setFormState(prevState => ({...prevState, slug}));
    };

    function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
        setFormState(prevState => {
            const newState = {...prevState};
            setIn(newState, event.target.name, event.target.value);
            return newState;
        });
    }

    async function handleSubmit (): Promise<{success: boolean, message: string}> {
        const result = createCategoryReqBody.safeParse(formState);
        if (!result.success) {
            const newErrors = formatZodErrors(result.error);
            setErrors(newErrors);
            return {success: false, message: "Some fields are invalid. Please check the form and try again."};
        }
        try {
            const response = await createCategory(result.data).unwrap();
            setErrors({});
            setFormState({});
            return {success: true, message: response.data.message};
        } catch (error: any) {
            return {success: false, message: error.data.message ?? "An error occurred while creating the category."};
        }
    }

    return (
        <div className={"grid gap-5"}>
            <AdminHeader
                headerContent={content}
            />
            <Outlet />
            <Dialog
                trigger={actionButtonRef}
                heading={"Add Category"}
                submitLabel={"Add Category"}
                submitAction={handleSubmit}
                onClose={() => setFormState({})}
            >
                <form
                    className={"flex flex-col gap-4"}
                >
                    <Input
                        onBlur={handleSlug}
                        name={"name"}
                        label={"Category Name"}
                        placeholder={"Eg. Shoes, Shirts, Watches, etc."}
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        name={"slug"}
                        label={"Category Slug"}
                        placeholder={"Eg. shoes, shirts, watches, etc."}
                        description={"The slug is used to create a unique URL for the category. It should be short and easy to remember."}
                        value={formState.slug}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleInputChange(e);
                            setFormState(prevState => ({...prevState, slug: e.target.value}));
                        }}
                    />
                </form>
            </Dialog>
        </div>
    );
}