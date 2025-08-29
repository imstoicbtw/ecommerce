"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductPropertyReqBody = exports.editReviewReqBody = exports.submitReviewReqBody = exports.createProductReqBody = void 0;
const exports_js_1 = require("../../exports.js");
const utils_zod_js_1 = require("../utils.zod.js");
exports.createProductReqBody = exports_js_1.zod.object({
    name: (0, utils_zod_js_1.zodString)(),
    description: (0, utils_zod_js_1.zodString)(),
    price: (0, utils_zod_js_1.zodNumber)(),
    onSale: exports_js_1.zod.boolean({ message: "This must be a boolean." }).default(false),
    salePrice: (0, utils_zod_js_1.zodNumber)().optional(),
    stock: (0, utils_zod_js_1.zodNumber)().default(0),
    isActive: exports_js_1.zod.boolean({ message: "This must be a boolean." }).default(true),
    category: (0, utils_zod_js_1.zodMongooseObjectId)(),
    thumbnail: (0, utils_zod_js_1.zodMongooseObjectId)(),
    gallery: exports_js_1.zod.array((0, utils_zod_js_1.zodMongooseObjectId)()).optional(),
}, { message: "This must be an object." });
exports.submitReviewReqBody = exports_js_1.zod.object({
    title: (0, utils_zod_js_1.zodString)({ min: 10 }),
    rating: exports_js_1.zod.number({ message: "This must be a number." })
        .refine(rating => rating >= 1 && rating <= 5, "This must be a number between 1 and 5."),
    comment: (0, utils_zod_js_1.zodString)({ min: 20 }),
    user: (0, utils_zod_js_1.zodMongooseObjectId)(),
}, { message: "This must be an object." });
exports.editReviewReqBody = exports.submitReviewReqBody.omit({ user: true });
exports.updateProductPropertyReqBody = exports_js_1.zod.object({
    key: (0, utils_zod_js_1.zodString)(),
    value: exports_js_1.zod.any(),
}, { message: "This must be an object." });
//# sourceMappingURL=product.zod.js.map