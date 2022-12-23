import { Model, Schema } from "mongoose";

export interface ICustomerBalance {
  customerID:Schema.Types.ObjectId,
  orderBalance: number,
  deliveryBalance: number,
  status?:boolean
}

export interface ICustomerBalanceModel extends Model<ICustomerBalance> {
  build(args: ICustomerBalance): ICustomerBalance;
}
