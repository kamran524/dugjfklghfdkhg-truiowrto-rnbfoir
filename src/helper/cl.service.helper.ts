import { Schema } from "mongoose";
import { IClService } from "../models/interfaces/cl.service.interface";

class ClServiceHelper {
  id: Schema.Types.ObjectId;
  title: string;
  content: string;
  status:boolean;

  constructor(model: IClService) {
    this.id = model._id;
    this.title = model.title;
    this.content = model.content;
    this.status = model.status;
  }
}

export default ClServiceHelper;