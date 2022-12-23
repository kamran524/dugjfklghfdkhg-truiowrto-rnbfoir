import { Model, Schema, LeanDocument } from "mongoose";

export interface IFlight {
  _id?: Schema.Types.ObjectId;
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  flightDate: Date;
  landingDate?: Date;
  boxIDs: LeanDocument<Schema.Types.ObjectId>[] | Schema.Types.ObjectId[];
  isCompleted?: boolean;
  totalWeight: string;
}

export interface IFlightModel extends Model<IFlight> {
  build(args: IFlight): IFlight;
}
