import {Model, Schema} from "mongoose";

export interface ICountryCode{
  _id?: Schema.Types.ObjectId;
  code:string;
  countryID:Schema.Types.ObjectId;
  status:boolean;
}

export interface ICountryCodeModel extends Model<ICountryCode>{
  build(args:ICountryCode):ICountryCode
}
