import { Schema } from "mongoose";
import { IPhone } from "../models/interfaces/phone.interface";

export class PhoneHelper {
  id: Schema.Types.ObjectId;
  countryCodeID: Schema.Types.ObjectId;
  operatorCodeID: Schema.Types.ObjectId;
  number: string;

  constructor(model: IPhone) {
    this.id = model._id;
    this.countryCodeID = model.countryCodeID;
    this.operatorCodeID = model.operatorCodeID;
    this.number = model.number;
  }
}
