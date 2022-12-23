import { Schema, model } from "mongoose";
import {ICity, ICityModel} from "./interfaces/city.interface";

const citySchema = new Schema<ICity>(
  {
    name:{
      type:String,
      required:true,
      unique:true
    },
    countryID:{
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
);

export const CityModel = model<ICity, ICityModel>(
  "City",
  citySchema
);
