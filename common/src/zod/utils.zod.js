"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodAddress = exports.zodName = void 0;
exports.zodEmail = zodEmail;
exports.zodPassword = zodPassword;
exports.zodString = zodString;
exports.zodNumber = zodNumber;
exports.zodMongooseObjectId = zodMongooseObjectId;
const exports_js_1 = require("../exports.js");
const constants_js_1 = require("../constants.js");
function zodEmail() {
    return exports_js_1.zod.string().email("This is not valid.");
}
function zodPassword() {
    return exports_js_1.zod.string().trim().regex(constants_js_1.PASSWORD_REGEX, "Invalid password.");
}
function zodString({ min, max, length, } = {
    min: 1,
    max: Infinity,
}) {
    return exports_js_1.zod.string()
        .trim()
        .min(length ?? min, length ? `This must be ${length} character(s) long.` : `This must be ${min} character(s) or more.`)
        .max(length ?? max, length ? `This must be ${length} character(s) long.` : `This must be ${max} character(s) or less.`);
}
function zodNumber({ min, max, } = {}) {
    return exports_js_1.zod.number()
        .min(min ?? 0, `This cannot be less than ${min}.`)
        .max(max ?? Infinity, `This cannot be more than ${max}.`);
}
function zodMongooseObjectId() {
    return exports_js_1.zod.string()
        .trim()
        .regex(/^([a-f0-9]){24}$/, "This must be a 24 characters long hexadecimal string.");
}
exports.zodName = exports_js_1.zod.object({
    firstName: exports_js_1.zod.string()
        .trim()
        .min(1, "This is required."),
    lastName: exports_js_1.zod.string()
        .trim()
        .min(1, "This is required."),
});
exports.zodAddress = exports_js_1.zod.object({
    name: exports.zodName,
    phoneNumber: zodString({ length: 10 }),
    countryCode: zodString(),
    building: zodString({ min: 10 }),
    street: zodString({ min: 10 }),
    city: zodString({ min: 3 }),
    state: zodString({ min: 3 }),
    pinCode: zodString({ min: 6 }),
    country: zodString({ min: 3 }),
});
//# sourceMappingURL=utils.zod.js.map