"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryReqBody = void 0;
const exports_js_1 = require("../../exports.js");
const utils_zod_js_1 = require("../utils.zod.js");
exports.createCategoryReqBody = exports_js_1.zod.object({
    name: (0, utils_zod_js_1.zodString)(),
    slug: (0, utils_zod_js_1.zodString)(),
    parent: (0, utils_zod_js_1.zodMongooseObjectId)().optional()
}, { message: "This must be an object." });
//# sourceMappingURL=category.zod.js.map