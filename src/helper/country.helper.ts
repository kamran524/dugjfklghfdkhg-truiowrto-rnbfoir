import { Schema } from "mongoose";
import { ICountry } from "../models/interfaces/country.interface";

export class CountryHelper {
  id: Schema.Types.ObjectId;
  name: string;
  alpha2code: string;
  alpha3code: string;
  image: string;

  constructor(model: ICountry) {
    this.id = model._id;
    this.name = model.name;
    this.alpha2code = model.alpha2code;
    this.alpha3code = model.alpha3code;
    this.image = model.image;
  }
}
