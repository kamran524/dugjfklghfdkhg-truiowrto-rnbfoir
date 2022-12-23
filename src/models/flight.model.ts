import {model,Schema} from "mongoose";
import {IFlight,IFlightModel} from "./interfaces/flight.interface";

const flightSchema = new Schema<IFlight>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
    to:{
      type:Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },
    flightDate:{
      type:Date,
      required: true
    },
    landingDate:{
      type:Date,
    },
    boxIDs: [{
      type: Schema.Types.ObjectId,
      ref: "Box",
      required: true,
    }],
    totalWeight:{
      type:String,
      required:true
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const FlightModel = model<IFlight, IFlightModel>(
  "Flight",
  flightSchema
);
