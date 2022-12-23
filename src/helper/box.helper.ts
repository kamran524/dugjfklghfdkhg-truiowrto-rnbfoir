import { LeanDocument, Schema } from "mongoose";
import { IBox } from "../models/interfaces/box.interface";

class BoxHelper {
  id: Schema.Types.ObjectId;
  barcode: string;
  ordersID: LeanDocument<Schema.Types.ObjectId>[] | Schema.Types.ObjectId[];
  totalWeight: string;
  status: boolean;

  constructor(model: IBox | LeanDocument<IBox>) {
    this.id = model._id;
    this.barcode = model.barcode;
    this.ordersID = model.ordersID;
    this.totalWeight = model.totalWeight;
    this.status = model.status;
  }
}

export default BoxHelper;
