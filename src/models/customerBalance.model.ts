import { Schema, model } from "mongoose";
import { ICustomerBalance, ICustomerBalanceModel } from "./interfaces/customerBalance.interface";

const customerBalanceSchema = new Schema<ICustomerBalance>(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderBalance: {
      type: Number,
      required: true,
    },
    deliveryBalance: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const CustomerBalanceModel = model<ICustomerBalance, ICustomerBalanceModel>(
  "CustomerBalance",
  customerBalanceSchema,
);
