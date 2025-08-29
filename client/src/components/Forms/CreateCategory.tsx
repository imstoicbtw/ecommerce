import React, { useEffect, useRef, useState } from "react";
import { type createCategoryReqBodyType, createCategoryReqBody } from "../../../../common/dist/zod/requests/category.zod.js";

const formSchema = createCategoryReqBody;

type FormValues = createCategoryReqBodyType;

type Props = {
    onSubmit: (payload: FormValues) => void | Promise<void>;
    isSubmitting?: boolean;
    initialValues?: Partial<FormValues>;
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export default function CreateCategoryForm({
    onSubmit,
    isSubmitting = false,
    initialValues,
}: Props) {
    const [values, setValues] = useState<FormValues>({
        name: initialValues?.name ?? "",
        slug: initialValues?.slug ?? "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
    const [formError, setFormError] = useState<string | null>(null);

    const userEditedSlugRef = useRef<boolean>(false);

    useEffect(() => {
        if (!userEditedSlugRef.current && values.slug.trim().length === 0) {
            const auto = slugify(values.name);
            setValues((prev) => ({ ...prev, slug: auto }));
        }
    }, [values.name]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value } as FormValues));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleSlugInput(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        if (val !== values.slug) {
            userEditedSlugRef.current = true;
        }
        setValues((prev) => ({ ...prev, slug: val }));
        setErrors((prev) => ({ ...prev, slug: undefined }));
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setFormError(null);

        const parsed = formSchema.safeParse(values);
        if (!parsed.success) {
            const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
            parsed.error.issues.forEach((iss) => {
                const key = iss.path[0] as keyof FormValues;
                if (!fieldErrors[key]) fieldErrors[key] = iss.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            await onSubmit(parsed.data);
            // Optionally clear the form after success
            setValues({ name: "", slug: "" });
            setErrors({});
            userEditedSlugRef.current = false;
        } catch (err: any) {
            setFormError(err?.message || "Something went wrong.");
        }
    }

    return (
        <form onSubmit={submit} className="w-full max-w-xl space-y-4 p-4 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold">Create Category</h2>

            {/* Name */}
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium">Category Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    className="border rounded-lg p-2 outline-none focus:ring w-full"
                    placeholder="e.g. Men's Shoes"
                />
                {errors.name ? (
                    <p className="text-xs text-red-600">{errors.name}</p>
                ) : (
                    <p className="text-xs text-gray-500">This will be shown to customers.</p>
                )}
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-1">
                <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={values.slug}
                    onChange={handleSlugInput}
                    className="border rounded-lg p-2 outline-none focus:ring w-full"
                    placeholder="e.g. mens-shoes"
                />
                {errors.slug ? (
                    <p className="text-xs text-red-600">{errors.slug}</p>
                ) : (
                    <p className="text-xs text-gray-500">Auto-filled from name if left empty.</p>
                )}
            </div>

            {formError && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">
                    {formError}
                </div>
            )}

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl border bg-black text-white disabled:opacity-60"
                >
                    {isSubmitting ? "Saving..." : "Create Category"}
                </button>
            </div>
        </form>
    );
}
