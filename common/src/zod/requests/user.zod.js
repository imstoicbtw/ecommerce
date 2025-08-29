"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartReqBody = exports.addNewAddressReqBody = exports.updatePasswordReqBody = exports.updateUserRoleReqBody = exports.updateCurrentUserDetailsReqBody = void 0;
const constants_js_1 = require("../../constants.js");
const exports_js_1 = require("../../exports.js");
const utils_zod_js_1 = require("../utils.zod.js");
// * updateCurrentUserDetails
exports.updateCurrentUserDetailsReqBody = exports_js_1.zod.object({
    name: utils_zod_js_1.zodName,
    email: (0, utils_zod_js_1.zodEmail)(),
}, { message: "This must be an object." });
// * updateUserRole
exports.updateUserRoleReqBody = exports_js_1.zod.object({
    role: exports_js_1.zod.enum(Object.values(constants_js_1.ROLES)),
});
// * updatePassword
exports.updatePasswordReqBody = exports_js_1.zod.object({
    oldPassword: (0, utils_zod_js_1.zodString)(),
    newPassword: (0, utils_zod_js_1.zodPassword)(),
}, { message: "This must be an object." });
// * addNewAddress
exports.addNewAddressReqBody = utils_zod_js_1.zodAddress;
// * addToCart
exports.addToCartReqBody = exports_js_1.zod.object({
    product: (0, utils_zod_js_1.zodMongooseObjectId)(),
    quantity: (0, utils_zod_js_1.zodNumber)({ min: 1 }),
});
//# sourceMappingURL=user.zod.js.map