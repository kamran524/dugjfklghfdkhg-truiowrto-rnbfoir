import { Schema, model } from "mongoose";
import {IClService, IClServiceModel} from "./interfaces/cl.service.interface";

const clServiceSchema = new Schema<IClService>(
  {
    title:{
      type:String,
      required:true
    },
    content:{
      type:String,
      required:true
      },
    status:{
      type:Boolean,
      default:true
      },
      
  },
  { timestamps: true }
);

export const ClServiceModel = model<IClService, IClServiceModel>(
  "ClService",
  clServiceSchema
);
