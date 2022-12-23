import { Schema } from "mongoose";
import { IPrivilege } from "../models/interfaces/privilege.interface";

export class PrivilegeHelper {
  id: Schema.Types.ObjectId;
  name: string;
  code: string;
  status: boolean;

  constructor(model: IPrivilege) {
    this.id = model._id;
    this.name = model.name;
    this.code = model.code;
    this.status = model.status;
  }
}
