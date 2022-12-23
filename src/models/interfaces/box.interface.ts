import {Model,Schema} from "mongoose";

export interface IBox{
  _id?: Schema.Types.ObjectId;
  barcode:string;
  ordersID:Schema.Types.ObjectId[];
  totalWeight:string;
  status?:boolean;
}

export interface IBoxModel extends Model<IBox>{
  build(args:IBox):IBox
}
