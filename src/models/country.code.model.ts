import {model,Schema} from "mongoose";
import {ICountryCodeModel,ICountryCode} from "./interfaces/phone.country.code.interface";

const countryCodeSchema = new Schema<ICountryCode>(
  {
    code:{
      type:String,
      required:true,
      unique:true
    },
    countryID:{
      type:Schema.Types.ObjectId,
      ref:"Country",
      required:true,
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
)

export const CountryCodeModel = model<ICountryCode,ICountryCodeModel>(
  "CountryCode",
  countryCodeSchema
)
