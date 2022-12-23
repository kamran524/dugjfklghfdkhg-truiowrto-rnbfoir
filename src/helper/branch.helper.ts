import { Schema } from "mongoose";
import { IBranch } from "../models/interfaces/branch.interface";

class BranchHelper {
  id: Schema.Types.ObjectId;
  name: string;
  code: string;
  addressID: Schema.Types.ObjectId;

  constructor(model: IBranch) {
    this.id = model._id;
    this.name = model.name;
    this.code = model.code;
    this.addressID = model.addressID;
  }
}

export default BranchHelper;