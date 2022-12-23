import { Schema } from "mongoose";
import { IAddress } from "../models/interfaces/address.interface";

export class AddressHelper {
  countryID: Schema.Types.ObjectId;
  cityID: Schema.Types.ObjectId;
  districtID: Schema.Types.ObjectId;
  street: string;

  constructor(model: IAddress) {
    this.countryID = model.countryID;
    this.cityID = model.cityID;
    this.districtID = model.districtID;
    this.street = model.street;
  }
}
