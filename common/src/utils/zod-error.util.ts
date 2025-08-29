export class ZodValidationError
    extends Error {
    name: string = "ZodValidationError";
    errors: Record<string, string> = {};

    constructor (data: Record<string, string>) {
        super("One or more data validations failed.");
        this.errors = data;
    }
}