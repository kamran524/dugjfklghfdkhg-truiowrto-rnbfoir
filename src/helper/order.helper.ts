import { Schema } from "mongoose";
import { ENUMS } from "../enum/enums";
import { IOrder } from "../models/interfaces/order.interface";


class OrderHelper {
  id: Schema.Types.ObjectId;
  customerID: Schema.Types.ObjectId;
  localBranchID: Schema.Types.ObjectId;
  foreignBranchID: Schema.Types.ObjectId;
  trackingNumber: string;
  shopTrackingNumber: string;
  productName: string;
  flightID: Schema.Types.ObjectId;
  boxID: Schema.Types.ObjectId;
  shop: string;
  quantity: number;
  invoicePrice: number;
  deliveryPrice: number;
  totalPrice: number;
  status: typeof ENUMS.ORDER_STATUS;

  constructor(model: IOrder) {
    this.id = model._id;
    this.customerID = model.customerID;
    this.localBranchID = model.localBranchID;
    this.foreignBranchID = model.foreignBranchID;
    this.trackingNumber = model.trackingNumber;
    this.shopTrackingNumber = model.shopTrackingNumber;
    this.productName = model.productName;
    this.flightID = model.flightID;
    this.boxID = model.boxID;
    this.shop = model.shop;
    this.quantity = model.quantity;
    this.invoicePrice = model.invoicePrice;
    this.deliveryPrice = model.deliveryPrice;
    this.totalPrice = model.totalPrice;
    this.status = model.status;
  }
}

export default OrderHelper;
