import { Mixed, Schema } from "mongoose";
import { IUserAgreement } from "../models/interfaces/user.agreement.interface";

export class UserAgreementHelper{
    id:Schema.Types.ObjectId;
    content:Mixed;
    status:boolean;

    constructor(model:IUserAgreement){
        this.id = model._id;
        this.content = model.content;
        this.status = model.status;
    }
}