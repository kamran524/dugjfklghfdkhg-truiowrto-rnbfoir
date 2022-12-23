import {model,Schema} from "mongoose";
import {IPayment, IPaymentModel} from "./interfaces/payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    customerID:{
      type:Schema.Types.ObjectId,
      ref:"Customer",
      required:true,
    },
    orderID:{
      type:Schema.Types.ObjectId,
      ref:"Order",
      required:true
    },
    currency:{
      type:String,
      required:true
    },
    orderDescription:{
      type:String
    },
    amount:{
      type:Number,
      required:true
    },
    orderCheckStatus:{
      type:Boolean,
      default:false
    },
    orderStatus:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
)

export const PaymentModel = model<IPayment,IPaymentModel>(
  "Payment",
  paymentSchema
)
