import { userRoles } from "common/dist/index.js";
import type { TUser } from "common/dist/mongoose/user.types.js";
import { UserModel } from "../models/user.model.js";


export async function seedAdmin () {
    const admin: TUser = await UserModel.findOne({ email: "admin@mail.com" }) || new UserModel();
    admin.set({
        name: { firstName: "Sufiyan", lastName: "Mulla" },
        email: "admin@mail.com", password: "Admin#3", role: userRoles.Admin,
    });
    const result = await admin.save();
    if (result._id) console.log("Admin user created successfully.", { email: "admin@mail.com", password: "Admin#3" });
    else console.log("Admin user creation failed. Please check the error message below.", result.errors);
}