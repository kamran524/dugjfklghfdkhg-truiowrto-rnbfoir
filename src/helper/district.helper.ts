import { Schema } from "mongoose";
import { IDistrict } from "../models/interfaces/districts.interface";

export class DistrictHelper {
  id: Schema.Types.ObjectId;
  name: string;

  constructor(model: IDistrict) {
    this.id = model._id;
    this.name = model.name;
  }
}
