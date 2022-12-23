import { Schema, model } from "mongoose";
import { IPrivilege, IPrivilegeModel } from "./interfaces/privilege.interface";

const privilegeSchema = new Schema<IPrivilege>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
}, { timestamps: true });

export const PrivilegeModel = model<IPrivilege, IPrivilegeModel>("Privilege", privilegeSchema);
