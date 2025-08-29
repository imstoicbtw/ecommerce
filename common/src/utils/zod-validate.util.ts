import type { ZodTypeAny } from "zod";
import { formatZodErrors } from "./format-zod-errors.js";
import { ZodValidationError } from "./zod-error.util.js";


export default function zodValidate (body: unknown, schema: ZodTypeAny) {
    const result = schema.safeParse(body);
    if (!result.success) {
        const data = formatZodErrors(result.error);
        throw new ZodValidationError(data);
    }
    return result.data;
}