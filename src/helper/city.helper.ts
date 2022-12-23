import { Schema } from "mongoose";
import { ICity } from "../models/interfaces/city.interface";

export class CityHelper {
  id: Schema.Types.ObjectId;
  name: string;

  constructor(model: ICity) {
    this.id = model._id;
    this.name = model.name;
  }
}
