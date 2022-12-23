import { Schema, model } from "mongoose";
import {ICountry, ICountryModel} from "./interfaces/country.interface";

const countrySchema = new Schema<ICountry>(
  {
   name:{
     type:String,
     required:true,
     unique:true
   },
    alpha2code:{
      type:String,
      required:true,
    },
    alpha3code:{
      type:String,
      required:true,
    },
   image:{
     type:String,
     required:true,
     unique:true,
   },
   status:{
     type:Boolean,
     default:true
   }
  },
  { timestamps: true }
);

export const CountryModel = model<ICountry, ICountryModel>(
  "Country",
  countrySchema
);
