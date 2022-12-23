import { Model, Schema } from "mongoose";

export interface IPrivacyPolicy {
    _id:Schema.Types.ObjectId,
    title:string,
    sectionList:[string[]],
    contentList:string[],
    status:boolean
}

export interface IPrivacyPolicyModel extends Model<IPrivacyPolicy> {
  build(args: IPrivacyPolicy): IPrivacyPolicy;
}
