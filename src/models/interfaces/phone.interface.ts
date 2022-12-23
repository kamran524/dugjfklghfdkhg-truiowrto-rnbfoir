import { Model, Schema } from "mongoose";

export interface IPhone {
  _id?: Schema.Types.ObjectId;
  countryCodeID: Schema.Types.ObjectId;
  operatorCodeID: Schema.Types.ObjectId;
  number: string;
  status: boolean;
}

export interface IPhoneModel extends Model<IPhone> {
  build(args: IPhone): IPhone;
}
