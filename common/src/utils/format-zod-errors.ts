import type { ZodError } from "zod";


export function formatZodErrors (error: ZodError<unknown>) {
    const result: {path: string[], message: string}[] = JSON.parse(error?.message || "");
    const data: Record<string, string> = {};
    result.forEach((error) => data[error.path.join(".")] = error.message);
    return data;
}