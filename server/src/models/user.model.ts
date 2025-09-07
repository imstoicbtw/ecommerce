import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { userRoles } from "../../../common/dist/constants.js";
import type { IUserMethods, IUserRawDoc, IUserVirtuals, TUser, TUserModel } from "../../../common/dist/mongoose/user.types.js";
import { mediaSchema } from "./media.model.js";
import { addressSchema } from "./subdocs/address.model.js";
import { nameSchema } from "./subdocs/name.model.js";


const userSchema: Schema = new Schema<IUserRawDoc, TUserModel, IUserMethods, {}, IUserVirtuals>({
    name: {
        type: nameSchema,
    },
    email: {
        type: String,
        required: [ true, "Email is required." ],
        unique: [ true, "Email already exists." ],
    },
    password: {
        type: String,
        required: [ true, "Password is required." ],
    },
    role: {
        type: String,
        enum: {
            values: Object.values(userRoles),
            message: "{VALUE} is not a valid role.",
        },
        default: "customer",
    },
    status: {
        type: Boolean,
        default: true,
    },
    avatar: {
        type: mediaSchema,
    },
    addresses: {
        type: [ addressSchema ],
        default: [],
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true });

// Plugins
userSchema.plugin(mongooseLeanVirtuals);


// Instance methods
userSchema.method({
    comparePassword: async function (this: TUser, enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    },
});


// Pre
userSchema.pre("save", async function (this: TUser, next: Function): Promise<void> {
    if (!this.isModified("password")) {
        next();
    }
    const salt: string = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const UserModel: TUserModel = model<IUserRawDoc, TUserModel>("User", userSchema);