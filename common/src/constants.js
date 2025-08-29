"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_REGEX = exports.ROLES = void 0;
exports.ROLES = {
    Admin: "admin",
    Customer: "customer",
    Manager: "manager",
};
exports.PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
//# sourceMappingURL=constants.js.map