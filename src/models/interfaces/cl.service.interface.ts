import {Model, Schema} from "mongoose";

export interface IClService{
  _id?: Schema.Types.ObjectId;
  title:string;
  content:string;
  status?:boolean;
}

export interface IClServiceModel extends Model<IClService>{
  build(args:IClService):IClService
}
