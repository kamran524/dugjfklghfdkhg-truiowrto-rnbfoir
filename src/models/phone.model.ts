import {model,Schema} from "mongoose";
import {IPhoneModel,IPhone} from "./interfaces/phone.interface";

const phoneSchema = new Schema<IPhone>(
  {
    countryCodeID:{
      type:Schema.Types.ObjectId,
      ref:"CountryCode",
      required:true
    },
    operatorCodeID:{
      type:Schema.Types.ObjectId,
      ref:"OperatorCode",
      required:true
    },
    number:{
      type:String,
      required:true,
      unique:true
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
)

export const PhoneModel = model<IPhone,IPhoneModel>(
  "Phone",
  phoneSchema
)
