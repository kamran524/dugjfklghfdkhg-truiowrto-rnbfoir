import { Model, Schema } from "mongoose";

export interface IFaq {
  _id:Schema.Types.ObjectId,
  question:string,
  answer:string,
  status:boolean
}

export interface IFaqsModel extends Model<IFaq> {
  build(args: IFaq): IFaq;
}
