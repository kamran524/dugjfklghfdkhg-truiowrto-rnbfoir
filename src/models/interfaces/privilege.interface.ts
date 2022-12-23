import { Model, Schema } from "mongoose";

export interface IPrivilege {
  _id?: Schema.Types.ObjectId;
  name: string;
  code: string;
  status: boolean;
}

export interface IPrivilegeModel extends Model<IPrivilege> {
  build(args: IPrivilege): IPrivilege;
}
