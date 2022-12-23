import { Schema, model } from "mongoose";
import { IFaq, IFaqsModel } from "./interfaces/faqs.interface";

const faqSchema = new Schema<IFaq>(
  {
    question:{
      type:String,
      required:true,
      unique:true
    },
    answer:{
      type: String,
      required: true,
    },
    status:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
);

export const FaqsModel = model<IFaq, IFaqsModel>(
  "Faqs",
  faqSchema
);
