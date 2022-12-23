import { model, Schema } from "mongoose";
import { IRole, IRoleModel } from "./interfaces/role.interface";

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
  },
  privileges: [{
    type: Schema.Types.ObjectId,
    ref: "Privilege",
  }],
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const RoleModel = model<IRole, IRoleModel>("Role", roleSchema);
