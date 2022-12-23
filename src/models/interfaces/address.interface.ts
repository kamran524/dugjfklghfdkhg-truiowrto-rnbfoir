import { Model, Schema } from "mongoose";

export interface IAddress {
  countryID:Schema.Types.ObjectId,
  cityID:Schema.Types.ObjectId,
  districtID:Schema.Types.ObjectId,
  street:string,
  status:boolean
}

export interface IAddressModel extends Model<IAddress> {
  build(args: IAddress): IAddress;
}
