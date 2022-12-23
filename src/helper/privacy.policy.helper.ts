import { Schema } from "mongoose";
import { IPrivacyPolicy } from "../models/interfaces/privacy.policy.interface";

export class PrivacyPolicyHelper{
    id:Schema.Types.ObjectId;
    title:string;
    contentList:string[];
    sectionList:[string[]];
    status:boolean;

    constructor(model:IPrivacyPolicy){
        this.id = model._id;
        this.title = model.title;
        this.contentList = model.contentList;
        this.sectionList = model.sectionList;
        this.status = model.status;

    }
}