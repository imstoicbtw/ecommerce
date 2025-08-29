"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserReqBody = exports.registerUserReqBody = void 0;
const exports_js_1 = require("../../exports.js");
const utils_zod_js_1 = require("../utils.zod.js");
// * registerUser
exports.registerUserReqBody = exports_js_1.zod.object({
    name: utils_zod_js_1.zodName,
    email: (0, utils_zod_js_1.zodEmail)(),
    password: (0, utils_zod_js_1.zodPassword)(),
    role: (0, utils_zod_js_1.zodString)().default("customer"),
}, { message: "This must be an object." });
// * loginUser
exports.loginUserReqBody = exports_js_1.zod.object({
    email: (0, utils_zod_js_1.zodEmail)(),
    password: (0, utils_zod_js_1.zodString)(),
}, { message: "This must be an object." });
//# sourceMappingURL=auth.zod.js.map