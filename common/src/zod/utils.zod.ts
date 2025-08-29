import { zod } from "../exports.js";
import { PASSWORD_REGEX } from "../constants.js";


export function zodEmail () {
    return zod.email("This email is not valid.");
}


export function zodPassword () {
    return zod.string({ error: "Password is not acceptable." }).trim().regex(PASSWORD_REGEX, "Please choose a stronger password.");
}


export function zodString (error: string, options?: {
    min?: number;
    max?: number;
    length?: number;
}) {
    const { min = 1, max = Infinity, length } = options ?? {};
    return zod.coerce.string({ error })
              .trim()
              .min(length ?? min as number, length ? `This must be ${length} character(s) long.` : `This must be ${min} character(s) or more.`)
              .max(length ?? max as number, length ? `This must be ${length} character(s) long.` : `This must be ${max} character(s) or less.`)
              .nonempty("This is required.");
}


export function zodNumber ({
    min,
    max,
    message,
}: {
    min?: number;
    max?: number;
    message?: string;
} = {}) {
    return zod.coerce.number({ error: message ?? "This must be a number." })
              .min(min ?? 0, `This cannot be less than ${min}.`)
              .max(max ?? Infinity, `This cannot be more than ${max}.`);
}


export function zodMongooseObjectId () {
    return zodString("This must be a valid ObjectId.")
        .trim()
        .regex(/^([a-f0-9]){24}$/, "This must be a 24 characters long hexadecimal string.");
}


export function zodLiteral (literalData: any) {
    return zod.literal(literalData, { error: `This must be exactly ${literalData}.` });
}


export function zodEnum<T extends readonly string[]> (enumData: T) {
    return zod.enum(enumData, { error: `This must be one of the following: ${enumData.join(", ")}.` });
}


export const zodName = zod.object({
    firstName: zodString("First name is not acceptable.")
        .trim()
        .min(1, "This is required."),
    lastName: zodString("Last name is not acceptable.")
        .trim()
        .min(1, "This is required."),
}, { error: "Name must include first name and last name." });


export const zodAddress = zod.object({
    name: zodName,
    phoneNumber: zodString("Phone number is not valid", { length: 10 }),
    countryCode: zodString("Country code is not valid"),
    building: zodString("Building name is is not valid", { min: 10 }),
    street: zodString("Street is is not valid", { min: 10 }),
    city: zodString("City is not valid", { min: 3 }),
    state: zodString("State is not valid", { min: 3 }),
    pinCode: zodString("Pin code is not valid", { min: 6 }),
    country: zodString("Country is not valid", { min: 3 }),
});