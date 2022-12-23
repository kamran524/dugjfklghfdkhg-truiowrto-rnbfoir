import { Schema, model } from "mongoose";
import {IDistrict, IDistrictModel} from "./interfaces/districts.interface";

const regionSchema = new Schema<IDistrict>(
  {
    name:{
      type:String,
      required:true,
      unique:true
    },
    cityID:{
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
);

export const DistrictsModel = model<IDistrict, IDistrictModel>(
  "District",
  regionSchema
);
