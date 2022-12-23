import { Schema } from "mongoose";
import { IPromoCode } from "../models/interfaces/promocode.interface";

export class PromoCodeHelper{
    id:Schema.Types.ObjectId;
    code:string;
    campaignID:Schema.Types.ObjectId;
    status:boolean;

    constructor(model:IPromoCode){
        this.id = model._id;
        this.code = model.code;
        this.campaignID = model.campaignID;
        this.status = model.status;
    }
}