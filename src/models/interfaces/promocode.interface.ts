import {Model,Schema} from "mongoose";

export interface IPromoCode {
  _id?: Schema.Types.ObjectId,
  code:string,
  campaignID:Schema.Types.ObjectId,
  status:boolean
}

export interface IPromoCodeModel extends Model<IPromoCode> {
  build(args: IPromoCode): IPromoCode;
}
