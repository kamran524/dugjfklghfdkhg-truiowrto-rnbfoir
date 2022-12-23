import {Model,Schema} from "mongoose";

export interface ICampaign {
  _id?: Schema.Types.ObjectId,
  name:string,
  tariffID:Schema.Types.ObjectId,
  isFixOrPerson:boolean,
  discount:number,
  startDate: Date;
  endDate: Date;
  status:boolean
}

export interface ICampaignModel extends Model<ICampaign> {
  build(args: ICampaign): ICampaign;
}
