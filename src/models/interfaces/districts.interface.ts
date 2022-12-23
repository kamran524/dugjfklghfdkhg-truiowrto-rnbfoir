import {Model,Schema} from "mongoose";

export interface IDistrict {
  _id?: Schema.Types.ObjectId
  name:string,
  cityID:Schema.Types.ObjectId,
  status:boolean
}

export interface IDistrictModel extends Model<IDistrict> {
  build(args: IDistrict): IDistrict;
}
