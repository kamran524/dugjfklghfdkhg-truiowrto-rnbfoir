import { Schema } from "mongoose";
import { ICountryCode } from "../models/interfaces/phone.country.code.interface";

export class PhoneCountryCodeHelper {
  id: Schema.Types.ObjectId;
  code: string;
  countryID: Schema.Types.ObjectId;

  constructor(model: ICountryCode) {
    this.id = model._id;
    this.code = model.code;
    this.countryID = model.countryID;
  }
}
