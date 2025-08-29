"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderReqBody = exports.createOrderReqBody = void 0;
const exports_js_1 = require("../../exports.js");
const utils_zod_js_1 = require("../utils.zod.js");
exports.createOrderReqBody = exports_js_1.zod.object({
    products: exports_js_1.zod.array(exports_js_1.zod.object({
        product: (0, utils_zod_js_1.zodMongooseObjectId)(),
        price: (0, utils_zod_js_1.zodNumber)(),
        savedAmount: (0, utils_zod_js_1.zodNumber)(),
        quantity: (0, utils_zod_js_1.zodNumber)(),
    })).nonempty("At least one product is required to place an order."),
    totalAmount: (0, utils_zod_js_1.zodNumber)(),
    savedAmount: (0, utils_zod_js_1.zodNumber)(),
    status: exports_js_1.zod.enum(["pending", "processing", "shipped", "delivered", "cancelled"], { message: "This is invalid." }),
    paymentStatus: exports_js_1.zod.enum(["pending", "completed", "failed"], { message: "This is invalid." }),
    paymentMethod: (0, utils_zod_js_1.zodString)(),
    shippingAddress: utils_zod_js_1.zodAddress,
}, { message: "This must be an object." });
exports.updateOrderReqBody = exports_js_1.zod.object({
    status: exports_js_1.zod.enum(["pending", "processing", "shipped", "delivered", "cancelled"], { message: "This is invalid." }),
}, { message: "This must be an object." });
//# sourceMappingURL=order.zod.js.map