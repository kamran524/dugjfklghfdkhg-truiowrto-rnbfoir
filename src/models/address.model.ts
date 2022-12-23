import { Schema, model } from "mongoose";
import {IAddress,IAddressModel} from "./interfaces/address.interface";

const addressSchema = new Schema<IAddress>(
  {
    countryID:{
      type:Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    cityID:{
      type:Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    districtID:{
      type:Schema.Types.ObjectId,
      ref: "District",
      required: true,
    },
    street:{
      type:String,
      required: true
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
);

export const AddressModel = model<IAddress, IAddressModel>(
  "Address",
  addressSchema
);
