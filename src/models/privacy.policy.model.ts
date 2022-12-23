import { model, Schema } from "mongoose";
import { IPrivacyPolicy, IPrivacyPolicyModel } from "../models/interfaces/privacy.policy.interface";

const privacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    contentList:{
        type:[String],
        required:true
    },
    sectionList:{
        type:[[String]]
    },
    status:{
        type: Boolean,
        default: true
    }
  },
  { timestamps: true }
);

export const PrivacyPolicyModel = model<IPrivacyPolicy, IPrivacyPolicyModel>("PrivacyPolicy", privacyPolicySchema);
