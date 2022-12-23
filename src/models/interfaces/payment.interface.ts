import {Model,Schema} from "mongoose";

export interface IPayment {
  customerID:Schema.Types.ObjectId,
  orderID:Schema.Types.ObjectId,
  currency:String,
  orderDescription:String,
  amount:String,
  orderCheckStatus:Boolean,
  orderStatus:Boolean
}

export interface IPaymentModel extends Model<IPayment> {
  build(args: IPayment): IPayment;
}
