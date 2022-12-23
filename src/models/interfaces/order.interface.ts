import { Model, Schema } from "mongoose";
import {ENUMS} from "../../enum/enums";

export interface IOrder {
  _id?: Schema.Types.ObjectId;
  customerID: Schema.Types.ObjectId;
  localBranchID: Schema.Types.ObjectId;
  trackingNumber: string;
  productName: string;
  foreignBranchID: Schema.Types.ObjectId;
  flightID: Schema.Types.ObjectId;
  boxID: Schema.Types.ObjectId;
  shop: string;
  quantity: number;
  shopTrackingNumber: string;
  invoicePrice: number;
  deliveryPrice: number;
  paymentMethod: typeof ENUMS.PAYMENT_METHODS;
  width: number;
  length: number;
  color: string;
  totalPrice: number;
  sentCustom: string;
  regNumber: string;
  isCustomsApproved: boolean;
  isCustomsAddToBox: boolean;
  isCustomsDepesh: boolean;
  customsApproveDate: Date;
  deliveryDate: Date;
  status: typeof ENUMS.ORDER_STATUS & string;
}

export interface IOrderModel extends Model<IOrder> {
  build(args: IOrder): IOrder;
}
