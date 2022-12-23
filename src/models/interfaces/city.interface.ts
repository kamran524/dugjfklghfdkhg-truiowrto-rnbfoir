import {Model,Schema} from "mongoose";

export interface ICity {
  _id?: Schema.Types.ObjectId,
  name:string,
  countryID:Schema.Types.ObjectId,
  status:boolean
}

export interface ICityModel extends Model<ICity> {
  build(args: ICity): ICity;
}
