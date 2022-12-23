import { Model, Schema } from "mongoose";

export interface IBranch {
  _id: Schema.Types.ObjectId;
  name: string;
  code: string;
  addressID: Schema.Types.ObjectId;
  status: boolean;
}

export interface IBranchModel extends Model<IBranch> {
  build(args: IBranch): IBranch;
}
