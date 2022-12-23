import { Schema, model } from "mongoose";
import { IBranch, IBranchModel } from "./interfaces/branch.interface";

const branchSchema = new Schema<IBranch>(
  {
    name:{
      type:String,
      unique:true,
      required:true
    },
    code: {
      type: String,
      immutable: true,
      unique: true,
    },
    addressID: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const BranchModel = model<IBranch, IBranchModel>(
  "Branch",
  branchSchema
);
