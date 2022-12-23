import {model,Schema} from "mongoose";
import {IOperatorCodeModel,IOperatorCode} from "./interfaces/phone.operator.code.interface";

const operatorCodeSchema = new Schema<IOperatorCode>(
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

export const OperatorCodeModel = model<IOperatorCode,IOperatorCodeModel>(
  "OperatorCode",
  operatorCodeSchema
)
