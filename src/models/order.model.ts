import { model, Schema } from "mongoose";
import {ENUMS} from "../enum/enums";
import { IOrder, IOrderModel } from "./interfaces/order.interface";

const orderSchema = new Schema<IOrder>({
  customerID: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  localBranchID: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  foreignBranchID: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  flightID: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  boxID: {
    type: Schema.Types.ObjectId,
    ref: "Box",
  },
  shop: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  shopTrackingNumber: {
    type: String,
    unique: true,
    required: true
  },
  invoicePrice: {
    type: Number,
  },
  deliveryPrice: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ENUMS.PAYMENT_METHODS,
    required: true,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  color: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  sentCustom: {
    type: String,
  },
  regNumber: {
    type: String,
  },
  isCustomsApproved: {
    type: Boolean,
    default: false,
  },
  isCustomsAddToBox: {
    type: Boolean,
    default: false,
  },
  isCustomsDepesh: {
    type: Boolean,
    default: false,
  },
  customsApproveDate: {
    type: Date,
  },
  deliveryDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ENUMS.ORDER_STATUS,
    default: ENUMS.ORDER_STATUS.PREPARING,
  },
});

export const OrderModel = model<IOrder, IOrderModel>("Order", orderSchema);
