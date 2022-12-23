import { Model, Schema } from "mongoose";

export interface IRole {
  _id?: Schema.Types.ObjectId;
  name: string;
  privileges: Schema.Types.ObjectId[];
  status: boolean;
}

export interface IRoleModel extends Model<IRole> {
  build(args: IRole): IRole;
}
