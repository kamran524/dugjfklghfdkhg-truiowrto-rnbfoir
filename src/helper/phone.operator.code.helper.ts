import { Schema } from "mongoose";
import { IOperatorCode } from "../models/interfaces/phone.operator.code.interface";

export class PhoneOperatorCodeHelper {
  id: Schema.Types.ObjectId;
  code: string;

  constructor(model: IOperatorCode) {
    this.id = model._id;
    this.code = model.code;
  }
}
