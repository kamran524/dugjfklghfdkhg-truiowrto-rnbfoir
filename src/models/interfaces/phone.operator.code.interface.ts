import { Model, Schema } from "mongoose";

export interface IOperatorCode {
  _id?: Schema.Types.ObjectId;
  code: string;
  countryID: Schema.Types.ObjectId;
  status: boolean;
}

export interface IOperatorCodeModel extends Model<IOperatorCode> {
  build(args: IOperatorCode): IOperatorCode;
}
