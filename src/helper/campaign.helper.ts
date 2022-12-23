import { Schema } from "mongoose";
import { ICampaign } from "../models/interfaces/campaign.interface";

export class CampaignHelper {
  id: Schema.Types.ObjectId;
  name: string;
  tariffID: Schema.Types.ObjectId;
  discount: number;
  startDate: Date;
  endDate:Date;
  status:boolean;
  isFixOrPerson:boolean;

  constructor(model: ICampaign) {
    this.id = model._id;
    this.name = model.name;
    this.tariffID = model.tariffID;
    this.discount = model.discount;
    this.startDate = model.startDate;
    this.endDate = model.endDate;
    this.status = model.status;
    this.isFixOrPerson = model.isFixOrPerson;
  }
}
