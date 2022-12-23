import { Model, Schema } from "mongoose";

export interface IUserAgreement {
    _id:Schema.Types.ObjectId,
    content:Schema.Types.Mixed,
    status:boolean
}

export interface IIUserAgreementModel extends Model<IUserAgreement> {
  build(args: IUserAgreement): IUserAgreement;
}
