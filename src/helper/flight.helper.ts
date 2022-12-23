import { LeanDocument, Schema } from "mongoose";
import { IFlight } from "../models/interfaces/flight.interface";

class FlightHelper {
  id: Schema.Types.ObjectId;
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  flightDate: Date;
  landingDate?: Date;
  boxIDs: LeanDocument<Schema.Types.ObjectId>[] | Schema.Types.ObjectId[];
  totalWeight: string;
  isCompleted: boolean;

  constructor(model: IFlight) {
    this.id = model._id;
    this.from = model.from;
    this.to = model.to;
    this.flightDate = model.flightDate;
    this.landingDate = model.landingDate;
    this.boxIDs = model.boxIDs;
    this.totalWeight = model.totalWeight;
    this.isCompleted = model.isCompleted;
  }
}

export default FlightHelper;
