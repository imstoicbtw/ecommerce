import { HydratedDocument, model, Model, Schema } from "mongoose";
import type { INameMethods, INameRawDoc, INameVirtuals, TName, TNameModel } from "../../../../common/dist/mongoose/user.types.js";


export const nameSchema: Schema = new Schema<INameRawDoc, TNameModel, INameMethods, {}, INameVirtuals>({
    firstName: {
        type: String,
        required: [ true, "First name is required" ],
    },
    lastName: {
        type: String,
        required: [ true, "Last name is required" ],
    },
});

nameSchema.virtual("fullName")
          .get(function (this: TName): string {
              return `${this.firstName} ${this.lastName}`;
          });


export const NameModel: TNameModel = model<
    INameRawDoc,
    TNameModel,
    INameMethods
>("Name", nameSchema);