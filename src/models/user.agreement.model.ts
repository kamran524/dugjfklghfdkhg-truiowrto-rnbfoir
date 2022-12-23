import { model, Schema } from "mongoose";
import { IIUserAgreementModel, IUserAgreement } from "./interfaces/user.agreement.interface";

const userAgreementSchema = new Schema<IUserAgreement>(
  {
    content:{
        type:Schema.Types.Mixed,
        required:true
    },
    status:{
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

export const UserAgreementModel = model<IUserAgreement, IIUserAgreementModel>("UserAgreement", userAgreementSchema);
