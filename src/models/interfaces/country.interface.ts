import { Model, Schema } from "mongoose";

export interface ICountry {
  _id?: Schema.Types.ObjectId;
  name: string;
  alpha2code: string;
  alpha3code: string;
  image: string;
  status: boolean;
}

export interface ICountryModel extends Model<ICountry> {
  build(args: ICountry): ICountry;
}
